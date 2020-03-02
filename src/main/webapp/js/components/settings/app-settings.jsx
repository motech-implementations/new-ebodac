import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import Alert from 'react-s-alert';
import { FieldArray } from 'react-final-form-arrays';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import arrayMutators from 'final-form-arrays';
import { withRouter } from 'react-router-dom';

import SelectField from '../../utils/form/select-field';
import renderFormField, { validate } from '../../utils/form/form-utils';
import { fetchAppSettings, updateAppSettings } from '../../actions/app-settings-actions';
import { fetchEntity } from '../../actions/entity-actions';
import {
  BOOLEAN, COLLECTION, DATE, DATE_TIME, ENUM, FLOAT,
  INTEGER, LONG_TEXT, RELATION, TEXT, TIME, VACCINATION_DATE,
} from '../../constants/field-types';
import { VACCINEE_ENTITY } from '../../constants/entity-types';
import {
  CONTAINS, CONTAINS_IGNORE_CASE,
  EQUALS, EQUALS_IGNORE_CASE, GREATER_THAN, GREATER_THAT_EQUAL,
  IS_BLANK,
  IS_EMPTY, IS_IN_THE_FUTURE, IS_IN_THE_PAST,
  IS_NOT_BLANK,
  IS_NOT_EMPTY, IS_NOT_IN_THE_FUTURE, IS_NOT_IN_THE_PAST,
  IS_NOT_NULL,
  IS_NULL, LESS_THAN, LESS_THAN_EQUAL, NOT_EQUALS,
} from '../../constants/operators';

const ALERT_TIMEOUT = 5000;
const ARRAY = 'ARRAY';

class AppSettings extends Component {
  componentDidMount() {
    this.props.fetchAppSettings();
    this.fetchEntityAndRelatedEntities();
  }

  onSubmit = (values) => {
    this.props.updateAppSettings(values, () => {
      Alert.success('App Settings has been updated!', {
        timeout: ALERT_TIMEOUT,
      });
    });
  };

  getFields = ({ sendIvrMessages, generateReports }) => [
    {
      fieldType: BOOLEAN,
      displayName: 'Send IVR Messages',
      name: 'sendIvrMessages',
    },
    {
      required: sendIvrMessages,
      hidden: !sendIvrMessages,
      fieldType: TEXT,
      displayName: 'Call Config Name',
      name: 'callConfigName',
    },
    {
      required: sendIvrMessages,
      hidden: !sendIvrMessages,
      fieldType: TIME,
      displayName: 'IVR Message Time',
      name: 'ivrMessageTime',
      format: 'HH:mm',
    },
    {
      fieldType: ENUM,
      displayName: 'Enrollment Conditions Resolution',
      name: 'enrollmentConditionsResolution',
      format: 'ALL_CONDITIONS_ARE_MET:All Conditions are met,ANY_OF_THE_CONDITIONS_IS_MET:Any of the Conditions is met',
    },
    {
      name: 'enrollmentConditions',
      fieldType: ARRAY,
      displayName: 'Enrollment Conditions',
    },
    {
      fieldType: BOOLEAN,
      displayName: 'Generate Reports',
      name: 'generateReports',
    },
    {
      required: generateReports,
      hidden: !generateReports,
      fieldType: TIME,
      displayName: 'Reports Generation Time',
      name: 'reportsGenerationTime',
      format: 'HH:mm',
    },
  ];

  getOperators = (fieldType) => {
    let operators = [];

    switch (fieldType) {
      case TEXT:
      case LONG_TEXT:
        operators = [
          IS_NULL, IS_NOT_NULL, IS_EMPTY, IS_NOT_EMPTY, IS_BLANK, IS_NOT_BLANK, EQUALS,
          EQUALS_IGNORE_CASE, NOT_EQUALS, CONTAINS, CONTAINS_IGNORE_CASE,
        ];
        break;
      case BOOLEAN:
      case RELATION:
      case ENUM:
        operators = [
          IS_NULL, IS_NOT_NULL, EQUALS, NOT_EQUALS,
        ];
        break;
      case INTEGER:
      case FLOAT:
        operators = [
          IS_NULL, IS_NOT_NULL, EQUALS, NOT_EQUALS,
          LESS_THAN_EQUAL, LESS_THAN, GREATER_THAT_EQUAL, GREATER_THAN,
        ];
        break;
      case DATE:
      case DATE_TIME:
        operators = [
          IS_NULL, IS_NOT_NULL, EQUALS, NOT_EQUALS, LESS_THAN_EQUAL, LESS_THAN, GREATER_THAT_EQUAL,
          GREATER_THAN, IS_IN_THE_PAST, IS_NOT_IN_THE_PAST, IS_IN_THE_FUTURE, IS_NOT_IN_THE_FUTURE,
        ];
        break;
      default:
        operators = [];
    }

    return _.map(operators, op => ({ value: op, label: op }));
  };

  getConditionFields = () => _.chain(this.props.vaccineeFields)
    .filter(item => item.fieldType !== COLLECTION && item.fieldType !== VACCINATION_DATE)
    .map(item => ({ label: item.displayName, value: item.id }))
    .value();

  renderConditionValueField = ({ fieldType, operator, fieldConfig }, name) => {
    if (!fieldType || !operator || operator === IS_NULL || operator === IS_NOT_NULL
      || operator === IS_EMPTY || operator === IS_NOT_EMPTY || operator === IS_BLANK
      || operator === IS_NOT_BLANK || operator === IS_IN_THE_PAST || operator === IS_NOT_IN_THE_PAST
      || operator === IS_IN_THE_FUTURE || operator === IS_NOT_IN_THE_FUTURE) {
      return null;
    }

    const config = this.props.vaccineeFields[fieldConfig];

    if (!config) {
      return null;
    }

    const { format, relatedEntity, relatedField } = config;
    let attr = {};

    switch (fieldType) {
      case DATE:
      case DATE_TIME:
      case ENUM:
        attr = { format };
        break;
      case RELATION:
        attr = { relatedEntity, relatedField };
        break;
      default:
        break;
    }

    return (
      <div>
        {renderFormField({
          name: `${name}.value`,
          displayName: 'Value',
          required: true,
          fieldType,
          ...attr,
        })}
      </div>
    );
  };

  renderConditionsArray = (fieldConfig, setFieldValue) => (
    <div key={fieldConfig.name}>
      <div>{ fieldConfig.displayName }</div>
      <FieldArray name={fieldConfig.name}>
        { ({ fields }) => (
          <div>
            {fields.map((name, index) => (
              <div key={name} className="arrayFields">
                <div className="d-flex flex-row-reverse">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => fields.remove(index)}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </div>
                <SelectField
                  key={`${name}.fieldConfig`}
                  fieldConfig={{
                    name: `${name}.fieldConfig`,
                    displayName: 'Field',
                    required: true,
                    options: this.getConditionFields(),
                    onChange: (value) => {
                      if (value) {
                        setFieldValue(`${name}.fieldType`, _.get(this.props.vaccineeFields, `${value}.fieldType`));
                      }
                      setFieldValue(`${name}.operator`, undefined);
                      setFieldValue(`${name}.value`, undefined);
                    },
                  }}
                />
                <SelectField
                  key={`${name}.operator`}
                  fieldConfig={{
                    name: `${name}.operator`,
                    displayName: 'Operator',
                    required: !!_.get(fields.value[index], 'fieldType'),
                    hidden: !_.get(fields.value[index], 'fieldType'),
                    options: this.getOperators(_.get(fields.value[index], 'fieldType')),
                    onChange: () => {
                      setFieldValue(`${name}.value`, undefined);
                    },
                  }}
                />
                {this.renderConditionValueField(fields.value[index], name)}
              </div>
            ))}
            <div>
              <button
                type="button"
                className="btn btn-success my-2"
                onClick={() => fields.push({})}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );

  validate = values => validate(this.getFields(values))(values);

  fetchEntityAndRelatedEntities() {
    _.forEach(this.props.vaccineeFields, (field) => {
      if (field.fieldType === RELATION) {
        this.props.fetchEntity(field.relatedEntity);
      }
    });
  }

  render() {
    const { appSettings, isOnline } = this.props;
    return (
      <div className="container">
        <div>
          <h1>
            {'Edit App Settings'}
          </h1>
        </div>
        <div>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            initialValues={appSettings}
            mutators={{
              setFieldValue: ([fieldName, fieldValue], state, { changeValue }) => {
                changeValue(state, fieldName, () => fieldValue);
              },
              ...arrayMutators,
            }}
            render={({ handleSubmit, values, form: { mutators: { setFieldValue } } }) => (
              <form onSubmit={handleSubmit} className="modal-fields">
                <div>
                  {_.map(this.getFields(values),
                    elem => (elem.fieldType === ARRAY
                      ? this.renderConditionsArray(elem, setFieldValue)
                      : renderFormField(elem)))}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg margin-top-sm padding-left-lg padding-right-lg margin-right-sm"
                    disabled={!isOnline}
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appSettings: state.appSettings.appSettings,
  isOnline: state.offline.online,
  vaccineeFields: state.fieldConfig[VACCINEE_ENTITY],
});

export default withRouter(
  connect(mapStateToProps, { fetchAppSettings, updateAppSettings, fetchEntity })(AppSettings),
);

AppSettings.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  updateAppSettings: PropTypes.func.isRequired,
  fetchAppSettings: PropTypes.func.isRequired,
  fetchEntity: PropTypes.func.isRequired,
  vaccineeFields: PropTypes.shape({}).isRequired,
  appSettings: PropTypes.shape({}),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

AppSettings.defaultProps = {
  appSettings: null,
};
