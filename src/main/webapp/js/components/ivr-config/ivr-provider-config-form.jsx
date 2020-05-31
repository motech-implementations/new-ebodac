import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FieldArray } from 'react-final-form-arrays';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import 'react-table/react-table.css';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import renderFormField from '../../utils/form-utils';
import { TEXT, ENUM, BOOLEAN } from '../../constants/field-types';
import SelectField from '../../utils/fields/select-field';

const ARRAY = 'ARRAY';
const JSON_OBJ = 'JSON_OBJ';

const TYPE_STRING = 'STRING';
const TYPE_INT = 'INT';
const TYPE_OBJECT = 'OBJECT';
const TYPE_ARRAY = 'ARRAY';

const TYPE_OPTIONS = [
  { value: TYPE_STRING, label: 'Text' },
  { value: TYPE_INT, label: 'Number' },
  { value: TYPE_OBJECT, label: 'Object' },
  { value: TYPE_ARRAY, label: 'Array' },
];

class IvrProviderConfigForm extends Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  getFields = (values, clearAuth, clearRequestParams, clearResponseParams, clearCallbackParams) => [
    {
      name: 'providerName',
      fieldType: TEXT,
      displayName: 'Provider Name',
      required: true,
    },
    {
      name: 'url',
      fieldType: TEXT,
      displayName: 'URL',
      required: true,
    },
    {
      name: 'httpMethod',
      fieldType: ENUM,
      displayName: 'HTTP Method',
      format: 'GET:Get,POST:Post',
      required: true,
    },
    {
      name: 'urlParams',
      fieldType: ARRAY,
      displayName: 'URL Params',
    },
    {
      name: 'authRequired',
      fieldType: BOOLEAN,
      displayName: 'Auth Required',
      onChange: clearAuth,
    },
    {
      name: 'username',
      fieldType: TEXT,
      displayName: 'Username',
      required: values.authRequired,
      hidden: !values.authRequired,
    },
    {
      name: 'password',
      fieldType: TEXT,
      displayName: 'Password',
      required: values.authRequired,
      hidden: !values.authRequired,
    },
    {
      name: 'jsonRequest',
      fieldType: BOOLEAN,
      displayName: 'Json Request',
      onChange: clearRequestParams,
    },
    {
      name: 'requestFields',
      fieldType: JSON_OBJ,
      displayName: 'Request Fields',
      defaultValue: {},
      hidden: !values.jsonRequest,
    },
    {
      name: 'requestParams',
      fieldType: ARRAY,
      displayName: 'Request Params',
      hidden: values.jsonRequest,
    },
    {
      name: 'jsonResponse',
      fieldType: BOOLEAN,
      displayName: 'Json Response',
      onChange: clearResponseParams,
    },
    {
      name: 'responseFields',
      fieldType: JSON_OBJ,
      displayName: 'Response Fields',
      defaultValue: {},
      hidden: !values.jsonResponse,
    },
    {
      name: 'timestampFormat',
      fieldType: TEXT,
      displayName: 'Timestamp Format',
      required: false,
    },
    {
      name: 'jsonCallback',
      fieldType: BOOLEAN,
      displayName: 'Json Callback',
      onChange: clearCallbackParams,
    },
    {
      name: 'callbackFields',
      fieldType: JSON_OBJ,
      displayName: 'Callback Fields',
      defaultValue: {},
      hidden: !values.jsonCallback,
    },
    {
      name: 'callbackParams',
      fieldType: ARRAY,
      displayName: 'Callback Params',
      defaultValue: [],
      hidden: values.jsonCallback,
    },
  ];

  renderArrayField = fieldConfig => (
    <div key={fieldConfig.name} className={fieldConfig.hidden ? 'd-none' : ''}>
      <h5 className="mt-4 mb-2 ml-3">{ fieldConfig.displayName }</h5>
      <FieldArray name={fieldConfig.name}>
        { ({ fields }) => (
          <div>
            {fields.map((name, index) => (
              <div key={name} style={{ width: '450px' }} className="arrayFields">
                <div className="d-flex flex-row-reverse">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => fields.remove(index)}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </div>
                { renderFormField({ fieldType: TEXT, name }) }
              </div>
            ))}
            <div className="ml-4 mb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => fields.push(fieldConfig.defaultValue || '')}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );

  renderJsonField = (fieldName, fieldType, ind, setFieldValue) => {
    if (fieldType !== TYPE_OBJECT && fieldType !== TYPE_ARRAY) {
      return null;
    }

    return (
      <div>
        <FieldArray name={`${fieldName}.childFields`}>
          { ({ fields }) => (
            <div>
              {fields.map((name, index) => (
                <div key={name} style={{ width: `${660 - 40 * ind}px` }} className={ind % 2 === 0 ? 'arrayFields' : 'nestedArrayFields'}>
                  { fieldType === TYPE_OBJECT && (
                    <div className="d-flex flex-row-reverse">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => fields.remove(index)}
                      >
                        <FontAwesomeIcon icon="trash" />
                      </button>
                    </div>
                  )}
                  { fieldType === TYPE_OBJECT && renderFormField({
                    name: `${name}.fieldName`,
                    fieldType: TEXT,
                    displayName: 'Field Name',
                    required: true,
                  })}
                  <SelectField
                    key={`${name}.fieldType`}
                    fieldConfig={{
                      name: `${name}.fieldType`,
                      displayName: 'Field Type',
                      required: true,
                      options: TYPE_OPTIONS,
                      onChange: (value) => {
                        if (value === TYPE_ARRAY || value === TYPE_OBJECT) {
                          setFieldValue(`${name}.childFields`, [{}]);
                        } else {
                          setFieldValue(`${name}.childFields`, undefined);
                        }
                      },
                    }}
                  />
                  {this.renderJsonField(name, _.get(fields.value[index], 'fieldType'), ind + 1, setFieldValue)}
                </div>
              ))}
              { fieldType === TYPE_OBJECT && (
              <div className="ml-4">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => fields.push({})}
                >
                  Add
                </button>
              </div>
              )}
            </div>
          )}
        </FieldArray>
      </div>
    );
  };

  renderJsonObject = (fieldConfig, values, setFieldValue) => (
    <div key={fieldConfig.name} style={{ width: '700px' }} className={`nestedArrayFields ${fieldConfig.hidden ? 'd-none' : ''}`}>
      <h5 className="mb-2 ml-3">{ fieldConfig.displayName }</h5>
      <SelectField
        key={`${fieldConfig.name}.fieldType`}
        fieldConfig={{
          name: `${fieldConfig.name}.fieldType`,
          displayName: 'Json Field Type',
          options: [{ value: TYPE_OBJECT, label: 'Object' }, { value: TYPE_ARRAY, label: 'Array' }],
          required: true,
          onChange: () => {
            setFieldValue(`${fieldConfig.name}.childFields`, [{}]);
          },
        }}
      />
      {this.renderJsonField(`${fieldConfig.name}`, _.get(values, `${fieldConfig.name}.fieldType`), 0, setFieldValue)}
    </div>
  );

  renderField = (fieldConfig, values, setFieldValue) => {
    switch (fieldConfig.fieldType) {
      case ARRAY:
        return this.renderArrayField(fieldConfig);
      case JSON_OBJ:
        return this.renderJsonObject(fieldConfig, values, setFieldValue);
      default:
        return renderFormField(fieldConfig);
    }
  };

  render() {
    const { isOnline } = this.props;

    return (
      <div className="modal-form">
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.props.ivrProviderConfig}
          mutators={{
            clearAuth: (args, state, { changeValue }) => {
              changeValue(state, 'username', () => undefined);
              changeValue(state, 'password', () => undefined);
            },
            clearRequestParams: (args, state, { changeValue }) => {
              changeValue(state, 'requestFields', () => undefined);
              changeValue(state, 'requestParams', () => undefined);
            },
            clearResponseParams: (args, state, { changeValue }) => {
              changeValue(state, 'responseFields', () => undefined);
            },
            clearCallbackParams: (args, state, { changeValue }) => {
              changeValue(state, 'callbackFields', () => undefined);
              changeValue(state, 'callbackParams', () => undefined);
            },
            setFieldValue: ([fieldName, fieldValue], state, { changeValue }) => {
              changeValue(state, fieldName, () => fieldValue);
            },
            ...arrayMutators,
          }}
          render={({
            handleSubmit, invalid, values,
            form: {
              mutators: {
                clearAuth, clearRequestParams, clearResponseParams,
                clearCallbackParams, setFieldValue,
              },
            },
          }) => (
            <form onSubmit={handleSubmit}>
              {_.map(this.getFields(values, clearAuth, clearRequestParams, clearResponseParams,
                clearCallbackParams), elem => this.renderField(elem, values, setFieldValue))}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={invalid || !isOnline}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary m-2"
                onClick={() => this.props.history.push('/ivrProviderConfigTable')}
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

const mapStateToProps = state => ({
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps)(IvrProviderConfigForm),
);

IvrProviderConfigForm.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  ivrProviderConfig: PropTypes.shape({}),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

IvrProviderConfigForm.defaultProps = {
  ivrProviderConfig: {},
};
