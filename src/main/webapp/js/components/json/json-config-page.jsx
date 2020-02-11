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
  BOOLEAN,
} from '../../constants/field-types';
import { getFieldConfigByEntity } from '../../selectors';
import TextField from '../../utils/form/text-field';
import CheckboxField from '../../utils/form/checkbox-field';

class JsonConfigPage extends Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  getOptions = () => _.map(_.filter(this.props.fieldConfig, 'editable'), v => ({
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
        displayName: 'Json field name',
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

  getJsonValueMapFields = (relatedField, relatedEntity) => [
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
      displayName: 'Json value',
      required: true,
    },
  ];

  getJsonValueEnumMapFields = fieldConfig => [
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
      displayName: 'Json value',
      required: true,
    },
  ];

  validate = (values) => {
    let hasKeyField = false;
    const errors = {};

    _.forEach(_.get(values, 'jsonFields', []), (field) => {
      if (field.keyField === true) {
        hasKeyField = true;
      }
    });

    errors.jsonFields = [];
    _.forEach(values.jsonFields, (jsonField, key) => {
      _.forEach(this.getFields(jsonField), (config) => {
        const val = jsonField[config.name];

        if (config.required && !config.hidden && (_.isNil(val) || val === '')) {
          errors.jsonFields[key] = { [config.name]: `${config.displayName} is required` };
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
          initialValues={this.props.jsonConfig}
          validate={this.validate}
          mutators={{
            ...arrayMutators,
          }}
          render={({
            handleSubmit, invalid, errors, dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                key="name"
                placeholder="Name"
                disabled={!this.props.isNew}
                fieldConfig={{
                  name: 'name', displayName: 'Json Name', required: true,
                }}
              />
              <TextField
                key="pathToData"
                placeholder="Path to Data"
                fieldConfig={{
                  name: 'pathToData', displayName: 'Path To Data', required: false,
                }}
              />
              <CheckboxField
                key="multipleRecord"
                fieldConfig={{
                  name: 'multipleRecord', displayName: 'Is data a multiple record?', required: false,
                }}
              />
              <FieldArray name="jsonFields">
                { ({ fields }) => (
                  <div>
                    {fields.map((name, index) => (
                      <div key={name} className="arrayFields">
                        {_.map(this.getFields(fields.value[index]), elem => renderFormField({ ...elem, name: `${name}.${elem.name}` }))}
                        {(() => {
                          // eslint-disable-next-line max-len
                          const fieldConfig = this.props.fieldConfig[fields.value[index].fieldConfigId];
                          if (fieldConfig && fieldConfig.fieldType === RELATION) {
                            return (
                              <div>
                                <FieldArray name={`${name}.fieldValueMap`}>
                                  { ({ fields: jsonValueMapFields }) => (
                                    <div>
                                      {jsonValueMapFields.map((jsonValueMapField, jsonMapIndex) => (
                                        <div key={jsonValueMapField} className="nestedArrayFields">
                                          { _.map(this.getJsonValueMapFields(fieldConfig.relatedField, fieldConfig.relatedEntity), jsonValueMap => renderFormField({ ...jsonValueMap, name: `${jsonValueMapField}.${jsonValueMap.name}` })) }
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => jsonValueMapFields.remove(jsonMapIndex)}
                                            disabled={!isOnline}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      ))}
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-success my-2"
                                          onClick={() => jsonValueMapFields.push({
                                            entityId: '',
                                            fieldValue: '',
                                          })}
                                        >
                                          Add Json value
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
                                  { ({ fields: jsonValueEnumMapFields }) => (
                                    <div>
                                      {jsonValueEnumMapFields.map((jsonEnumField, enumIndex) => (
                                        <div key={jsonEnumField} className="nestedArrayFields">
                                          { _.map(this.getJsonValueEnumMapFields(fieldConfig), jsonValueEnumMap => renderFormField({ ...jsonValueEnumMap, name: `${jsonEnumField}.${jsonValueEnumMap.name}` })) }
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => jsonValueEnumMapFields.remove(enumIndex)}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      ))}
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-success my-2"
                                          onClick={() => jsonValueEnumMapFields.push({
                                            enumValue: '',
                                            fieldValue: '',
                                          })}
                                        >
                                          Add Json value
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
                          disabled={!isOnline}
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
                      disabled={!entityType}
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
                className="btn btn-danger m-2"
                onClick={() => this.props.history.push('/jsonConfigTable')}
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
  connect(mapStateToProps)(JsonConfigPage),
);

JsonConfigPage.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  jsonConfig: PropTypes.shape(),
  fieldConfig: PropTypes.shape(),
  entityType: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};


JsonConfigPage.defaultProps = {
  jsonConfig: {},
  fieldConfig: {},
  isNew: false,
};
