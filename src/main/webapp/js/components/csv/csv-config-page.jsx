import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FieldArray } from 'react-final-form-arrays';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import 'react-table/react-table.css';
import { withRouter } from 'react-router-dom';

import renderFormField from '../../utils/form/form-utils';
import {
  TEXT,
  ENUM,
  RELATION,
  DATE,
  DATE_TIME,
} from '../../constants/field-types';
import { getFieldConfigByEntity } from '../../selectors';
import TextField from '../../utils/form/text-field';

class CsvConfigPage extends Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  getOptions = () => _.map(this.props.fieldConfig, v => ({
    label: v.displayName,
    value: v.id,
  }));

  getFields = (fieldValue) => {
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

  validate = (values) => {
    const errors = {};
    errors.csvFields = [];

    _.forEach(values.csvFields, (csvField, key) => {
      _.forEach(this.getFields(csvField), (config) => {
        const val = csvField[config.name];

        if (config.required && !config.hidden && (_.isNil(val) || val === '')) {
          errors.csvFields[key] = { [config.name]: `${config.displayName} is required` };
        }
      });
    });

    return errors;
  };

  render() {
    const { entityType } = this.props;

    return (
      <div>
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.props.csvConfig}
          validate={this.validate}
          mutators={{
            ...arrayMutators,
          }}
          render={({
            handleSubmit, invalid,
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
                      <div key={name} className="csvFields">
                        {_.map(this.getFields(fields.value[index]), elem => renderFormField({ ...elem, name: `${name}.${elem.name}` }))}
                        {(() => {
                          // eslint-disable-next-line max-len
                          const fieldConfig = this.props.fieldConfig[fields.value[index].fieldConfigId];
                          if (fieldConfig && fieldConfig.fieldType === RELATION) {
                            return (
                              <div>
                                <FieldArray name={`${name}.fieldValueMap`}>
                                  { ({ fields: csvValueMapFields }) => (
                                    <div>
                                      {csvValueMapFields.map(csvValueMapField => (
                                        <div key={csvValueMapField} className="csvValueMapField">
                                          { _.map(this.getCsvValueMapFields(fieldConfig.relatedField, fieldConfig.relatedEntity), csvValueMap => renderFormField({ ...csvValueMap, name: `${csvValueMapField}.${csvValueMap.name}` })) }
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => csvValueMapFields.remove(index)}
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
                          return null;
                        })()}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => fields.remove(index)}
                        >
                                    Delete
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-success mr-2 d-inline-block"
                      disabled={!entityType}
                      onClick={() => {
                        fields.push({
                          fieldConfigId: '',
                          fieldName: '',
                          format: '',
                          defaultValue: '',
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
                disabled={invalid || !entityType}
              >
                      Save
              </button>
              <button
                type="button"
                className="btn btn-danger m-2"
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
});

export default withRouter(
  connect(mapStateToProps)(CsvConfigPage),
);

CsvConfigPage.propTypes = {
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