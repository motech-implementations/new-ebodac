import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FieldArray } from 'react-final-form-arrays';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import 'react-table/react-table.css';
import { withRouter } from 'react-router-dom';

import renderFormField from '../../utils/form-utils';
import {
  TEXT,
  ENUM,
  RELATION,
  DATE,
  DATE_TIME,
  BOOLEAN,
} from '../../constants/field-types';
import { getFieldConfigByEntity } from '../../selectors';
import TextField from '../../utils/fields/text-field';

class CsvConfigPage extends Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  getOptions = () => _.chain(this.props.fieldConfig)
    .filter('editable')
    .sortBy(['hidden', 'fieldOrder'])
    .map(v => ({ label: v.displayName, value: v.id }))
    .value();

  getFields = (fieldValue, clearDefaultValue) => {
    let hideFormat = true;
    const fieldConfig = this.props.fieldConfig[fieldValue.fieldConfigId];
    if (fieldConfig && (fieldConfig.fieldType === DATE || fieldConfig.fieldType === DATE_TIME)) {
      hideFormat = false;
    }

    return [
      {
        name: 'fieldConfigId',
        fieldType: ENUM,
        displayName: 'Field name',
        required: true,
        options: this.getOptions(),
        onChange: clearDefaultValue,
      },
      {
        name: 'fieldName',
        fieldType: TEXT,
        displayName: 'CSV field name',
        required: true,
      },
      {
        name: 'format',
        fieldType: TEXT,
        displayName: 'Format',
        required: true,
        hidden: hideFormat,
      },
      {
        name: 'defaultValue',
        fieldType: fieldConfig ? fieldConfig.fieldType : TEXT,
        displayName: 'Default value',
        relatedField: fieldConfig ? fieldConfig.relatedField : null,
        relatedEntity: fieldConfig ? fieldConfig.relatedEntity : null,
        required: fieldConfig ? fieldConfig.required : false,
        format: fieldConfig ? fieldConfig.format : null,
      },
      {
        name: 'keyField',
        fieldType: BOOLEAN,
        displayName: 'Key Field?',
        required: false,
      },
    ];
  };

  getCsvValueMapFields = (relatedField, relatedEntity) => [
    {
      name: 'entityId',
      fieldType: RELATION,
      displayName: 'Entity value',
      required: true,
      relatedField,
      relatedEntity,
    },
    {
      name: 'fieldValue',
      fieldType: TEXT,
      displayName: 'CSV value',
      required: true,
    },
  ];

  getCsvValueEnumMapFields = fieldConfig => [
    {
      name: 'enumValue',
      fieldType: ENUM,
      displayName: 'Enum value',
      required: true,
      format: fieldConfig.format,
    },
    {
      name: 'fieldValue',
      fieldType: TEXT,
      displayName: 'CSV value',
      required: true,
    },
  ];

  validate = (values) => {
    let hasKeyField = false;
    const errors = {};

    _.forEach(_.get(values, 'csvFields', []), (field) => {
      if (field.keyField === true) {
        hasKeyField = true;
      }
    });

    errors.csvFields = [];
    _.forEach(values.csvFields, (csvField, key) => {
      _.forEach(this.getFields(csvField), (config) => {
        const val = csvField[config.name];

        if (config.required && !config.hidden && (_.isNil(val) || val === '')) {
          errors.csvFields[key] = { [config.name]: `${config.displayName} is required` };
        }
      });
    });
    if (!hasKeyField) {
      errors.keyField = 'You must add at least one unique field (or combination of fields) '
      + 'that can be used to identify and update the entity';
    }
    return errors;
  };

  render() {
    const { entityType, isOnline } = this.props;
    return (
      <div className="modal-form">
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.props.csvConfig}
          validate={this.validate}
          mutators={{
            clearDefaultValue: ([index], state, utils) => {
              utils.changeValue(state, `csvFields[${index}].defaultValue`, () => undefined);
              utils.changeValue(state, `csvFields[${index}].format`, () => undefined);
            },
            ...arrayMutators,
          }}
          render={({
            handleSubmit, invalid, errors, dirty, form: { mutators },
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                key="name"
                placeholder="Name"
                disabled={!this.props.isNew}
                fieldConfig={{
                  name: 'name', displayName: 'CSV Name', required: true,
                }}
              />
              <FieldArray name="csvFields">
                { ({ fields }) => (
                  <div>
                    {fields.map((name, index) => (
                      <div key={name} className="arrayFields">
                        {_.map(this.getFields(fields.value[index], () => mutators.clearDefaultValue(index)), elem => renderFormField({ ...elem, name: `${name}.${elem.name}` }))}
                        {(() => {
                          // eslint-disable-next-line max-len
                          const fieldConfig = this.props.fieldConfig[fields.value[index].fieldConfigId];
                          if (fieldConfig && fieldConfig.fieldType === RELATION) {
                            return (
                              <div>
                                <FieldArray name={`${name}.fieldValueMap`}>
                                  { ({ fields: csvValueMapFields }) => (
                                    <div>
                                      {csvValueMapFields.map((csvValueMapField, valueMapIndex) => (
                                        <div key={csvValueMapField} className="nestedArrayFields">
                                          { _.map(this.getCsvValueMapFields(fieldConfig.relatedField, fieldConfig.relatedEntity), csvValueMap => renderFormField({ ...csvValueMap, name: `${csvValueMapField}.${csvValueMap.name}` })) }
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => csvValueMapFields.remove(valueMapIndex)}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      ))}
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-success my-2"
                                          onClick={() => csvValueMapFields.push({
                                            entityId: '',
                                            fieldValue: '',
                                          })}
                                        >
                                          Add CSV value
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </FieldArray>
                              </div>
                            );
                          }
                          if (fieldConfig && fieldConfig.fieldType === ENUM) {
                            return (
                              <div>
                                <FieldArray name={`${name}.enumValueMap`}>
                                  { ({ fields: csvValueEnumMapFields }) => (
                                    <div>
                                      {csvValueEnumMapFields.map((enumField, enumIndex) => (
                                        <div key={enumField} className="nestedArrayFields">
                                          { _.map(this.getCsvValueEnumMapFields(fieldConfig), csvValueEnumMap => renderFormField({ ...csvValueEnumMap, name: `${enumField}.${csvValueEnumMap.name}` })) }
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => csvValueEnumMapFields.remove(enumIndex)}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      ))}
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-success my-2"
                                          onClick={() => csvValueEnumMapFields.push({
                                            enumValue: '',
                                            fieldValue: '',
                                          })}
                                        >
                                          Add CSV value
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </FieldArray>
                              </div>
                            );
                          }
                          return null;
                        })()}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => fields.remove(index)}
                          disabled={!isOnline
                            || (this.props.fieldConfig[fields.value[index].fieldConfigId]
                              ? this.props.fieldConfig[fields.value[index].fieldConfigId].required
                              : false)}
                        >
                                    Delete
                        </button>
                      </div>
                    ))}
                    { errors.keyField && dirty && (
                    <div className="has-error">
                      { errors.keyField }
                    </div>
                    )}
                    <button
                      type="button"
                      className="btn btn-success mr-2 d-inline-block"
                      disabled={!entityType || !isOnline}
                      onClick={() => {
                        fields.push({
                          fieldConfigId: '',
                          fieldName: '',
                          format: '',
                          defaultValue: '',
                          keyField: false,
                        });
                      }}
                    >
                              Add field config
                    </button>
                  </div>
                )}
              </FieldArray>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={invalid || !entityType || !isOnline}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary m-2"
                onClick={() => this.props.history.push('/csvConfigTable')}
              >
                Cancel
              </button>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  fieldConfig: getFieldConfigByEntity(state, props),
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps)(CsvConfigPage),
);

CsvConfigPage.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  csvConfig: PropTypes.shape(),
  fieldConfig: PropTypes.shape(),
  entityType: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};


CsvConfigPage.defaultProps = {
  csvConfig: {},
  fieldConfig: {},
  isNew: false,
};
