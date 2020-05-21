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

import renderFormField from '../../utils/form/form-utils';
import { RELATION, TEXT, ENUM } from '../../constants/field-types';
import { getFieldConfigByEntity } from '../../selectors';
import { fetchEntity } from '../../actions/entity-actions';
import { fetchAllIvrProviderConfigs } from '../../actions/ivr-provider-config-actions';
import SelectField from '../../utils/form/select-field';
import {
  CAMPAIGN_MESSAGE_ENTITY,
  LANGUAGE_ENTITY,
  VACCINEE_ENTITY,
} from '../../constants/entity-types';
import TextField from '../../utils/form/text-field';
import SelectWithCustomValuesField from '../../utils/form/select-with-custom-values-field';

const ARRAY = 'ARRAY';

class CallConfigForm extends Component {
  componentDidMount() {
    this.props.fetchEntity(LANGUAGE_ENTITY);
    this.props.fetchEntity(CAMPAIGN_MESSAGE_ENTITY);
    this.props.fetchAllIvrProviderConfigs();
  }

  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  getIvrProviders = () => _.map(this.props.ivrProviderConfigs,
    item => ({ label: item.providerName, value: item.id }));

  getVaccineeFields = () => _.chain(this.props.fieldConfig)
    .filter(item => item.base)
    .map(item => ({ label: item.displayName, value: item.id }))
    .value();

  getGroupByFields = formValues => (_.chain(this.props.fieldConfig)
    .filter(field => _.includes(formValues.entityFields, field.id)))
    .map(item => ({ label: item.displayName, value: item.name }))
    .value();

  getFieldsForParamsMap = formValues => (_.chain(this.props.fieldConfig)
    .filter(field => _.includes(formValues.entityFields, field.id)))
    .map(item => ({ label: item.displayName, value: `<${item.name}>` }))
    .value();

  getFields = () => [
    {
      name: 'languageMap',
      fieldType: ARRAY,
      displayName: 'Language map',
      defaultValue: {},
      fields: [
        {
          name: 'key',
          fieldType: RELATION,
          displayName: 'Language',
          relatedEntity: LANGUAGE_ENTITY,
          relatedField: 'name',
          required: true,
        },
        {
          name: 'value',
          fieldType: TEXT,
          displayName: 'IVR language id',
          required: true,
        },
      ],
    },
    {
      name: 'messageKeyMap',
      fieldType: ARRAY,
      displayName: 'Message key map',
      defaultValue: {},
      fields: [
        {
          name: 'key',
          fieldType: RELATION,
          displayName: 'Campaign Message',
          relatedEntity: CAMPAIGN_MESSAGE_ENTITY,
          relatedField: 'name',
          required: true,
        },
        {
          name: 'value',
          fieldType: TEXT,
          displayName: 'IVR message id',
          required: true,
        },
      ],
    },
    {
      name: 'callStatusMap',
      fieldType: ARRAY,
      displayName: 'Call status map',
      defaultValue: {},
      fields: [
        {
          name: 'key',
          fieldType: TEXT,
          displayName: 'IVR status code',
          required: true,
        },
        {
          name: 'value',
          fieldType: ENUM,
          displayName: 'Call status',
          format: 'INITIATED:Initiated,IN_PROGRESS:In progress,SMS_SENT:SMS send,FAILED:Failed,'
            + 'FINISHED_COMPLETE:Finished Completed,FINISHED_INCOMPLETE:Finish Incomplete,OTHER:Other',
          required: true,
        },
      ],
    },
  ];

  getIvrResponseFields = () => [
    {
      name: 'PROVIDER_CALL_ID',
      displayName: 'Provider Call Id',
      required: true,
    },
    {
      name: 'RECEIVER_ID',
      displayName: 'Receiver Id',
      required: true,
    },
    {
      name: 'PHONE',
      displayName: 'Phone Number',
    },
  ];

  getCallbackFields = () => [
    {
      name: 'PROVIDER_CALL_ID',
      displayName: 'Provider Call Id',
      required: true,
    },
    {
      name: 'CALL_DETAIL_ID',
      displayName: 'Call Detail Id',
    },
    {
      name: 'PHONE',
      displayName: 'Phone Number',
    },
    {
      name: 'CALL_STATUS',
      displayName: 'Call Status',
    },
    {
      name: 'START_TIMESTAMP',
      displayName: 'Start Timestamp',
    },
    {
      name: 'END_TIMESTAMP',
      displayName: 'End Timestamp',
    },
    {
      name: 'NUMBER_OF_ATTEMPTS',
      displayName: 'Number of Attempts',
    },
    {
      name: 'CALL_DURATION',
      displayName: 'Call Duration',
    },
    {
      name: 'MESSAGE_PERCENT_LISTENED',
      displayName: 'Message Percent Listened',
    },
    {
      name: 'MESSAGE_TIME_LISTENED',
      displayName: 'Message Time Listened',
    },
  ];

  renderArrayField = fieldConfig => (
    <div key={fieldConfig.name}>
      <h5 className="mt-4 mb-2 ml-3">{ fieldConfig.displayName }</h5>
      <FieldArray name={fieldConfig.name}>
        { ({ fields }) => (
          <div>
            {fields.map((name, index) => (
              <div key={name} style={{ width: '650px' }} className="nestedArrayFields">
                <div className="d-flex flex-row-reverse">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => fields.remove(index)}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </div>
                { _.map(fieldConfig.fields, field => renderFormField({ ...field, name: `${name}.${field.name}` })) }
              </div>
            ))}
            <div className="ml-4 mb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => fields.push(fieldConfig.defaultValue || {})}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );

  getParamsFromJsonField = (jsonField) => {
    if (!jsonField) {
      return [];
    }

    const params = !jsonField.childFields ? [] : _.chain(jsonField.childFields)
      .map(field => this.getParamsFromJsonField(field))
      .flatMap(item => item).value();

    if (jsonField.fieldType !== 'ARRAY' && jsonField.fieldType !== 'OBJECT' && jsonField.fieldName) {
      return [jsonField.fieldName, ...params];
    }

    return params;
  };

  renderParamsMap = (params, name, displayName) => (
    <div>
      <h5 className="mt-4 mb-2 ml-3">{displayName}</h5>
      <div style={{ width: '650px' }} className="nestedArrayFields">
        {_.map(params, param => renderFormField({
          name: `${name}.${param}`,
          fieldType: TEXT,
          displayName: param,
        }))}
      </div>
    </div>
  );

  renderRequestParamsMap = (params, vaccineeFields) => (
    <div>
      <h5 className="mt-4 mb-2 ml-3">Request Params Map</h5>
      <div style={{ width: '650px' }} className="nestedArrayFields">
        {_.map(params, param => (
          <SelectWithCustomValuesField
            key={`requestParamsMap.${param}`}
            fieldConfig={{
              name: `requestParamsMap.${param}`,
              displayName: param,
              options: [{ value: '<messageKey>', label: 'Message Key' }, ...vaccineeFields],
            }}
          />
        ))}
      </div>
    </div>
  );

  renderParamsSelect = (fields, options, name, displayName) => (
    <div>
      <h5 className="mt-4 mb-2 ml-3">{displayName}</h5>
      <div style={{ width: '650px' }} className="nestedArrayFields">
        {_.map(fields, field => (
          <SelectField
            key={`${name}.${field.name}`}
            fieldConfig={{ ...field, name: `${name}.${field.name}`, options }}
          />
        ))}
      </div>
    </div>
  );

  renderProviderParamsMap = (ivrProviderConfigId, vaccineeFields) => {
    if (!ivrProviderConfigId || !this.props.ivrProviderConfigs) {
      return null;
    }

    const ivrProviderConfig = this.props.ivrProviderConfigs[ivrProviderConfigId];

    if (!ivrProviderConfig) {
      return null;
    }

    const {
      urlParams, jsonRequest, jsonResponse, jsonCallback,
    } = ivrProviderConfig;

    let { requestParams, callbackParams } = ivrProviderConfig;
    let responseParams = null;

    if (jsonRequest) {
      requestParams = this.getParamsFromJsonField(ivrProviderConfig.requestFields);
    }

    if (jsonResponse) {
      responseParams = this.getParamsFromJsonField(ivrProviderConfig.responseFields);
    }

    if (jsonCallback) {
      callbackParams = this.getParamsFromJsonField(ivrProviderConfig.callbackFields);
    }

    const responseOptions = !responseParams ? [] : _.map(responseParams,
      param => ({ value: param, label: param }));
    const callbackOptions = !callbackParams ? [] : _.map(callbackParams,
      param => ({ value: param, label: param }));

    return (
      <div>
        {urlParams && !!urlParams.length && this.renderParamsMap(urlParams, 'urlParamsMap', 'URL Params Map')}
        {requestParams && !!requestParams.length
          && this.renderRequestParamsMap(requestParams, vaccineeFields)}
        {this.renderParamsSelect(this.getIvrResponseFields(), [...responseOptions, ...vaccineeFields], 'responseParamsMap', 'Response Params Map')}
        {this.renderParamsSelect(this.getCallbackFields(), callbackOptions, 'callbackParamsMap', 'Callback Params Map')}
      </div>
    );
  };

  render() {
    const { isOnline } = this.props;
    const vaccineeFields = this.getVaccineeFields();

    return (
      <div className="modal-form">
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.props.callConfig}
          mutators={{
            clearProviderParamsMap: (args, state, { changeValue }) => {
              changeValue(state, 'urlParamsMap', () => undefined);
              changeValue(state, 'requestParamsMap', () => undefined);
              changeValue(state, 'responseParamsMap', () => undefined);
              changeValue(state, 'callbackParamsMap', () => undefined);
            },
            clearGroupByFields: (args, state, { changeValue }) => {
              changeValue(state, 'groupByFields', () => undefined);
              changeValue(state, 'responseParamsMap', () => {});
            },
            ...arrayMutators,
          }}
          render={({
            handleSubmit, invalid, values,
            form: { mutators: { clearProviderParamsMap, clearGroupByFields } },
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                key="name"
                fieldConfig={{
                  name: 'name',
                  displayName: 'Name',
                  required: true,
                }}
              />
              <SelectField
                key="ivrProviderConfig"
                fieldConfig={{
                  name: 'ivrProviderConfig',
                  displayName: 'IVR Provider',
                  required: true,
                  options: this.getIvrProviders(),
                  onChange: clearProviderParamsMap,
                }}
              />
              <SelectField
                key="entityFields"
                fieldConfig={{
                  name: 'entityFields',
                  displayName: 'Vaccinee fields',
                  multi: true,
                  options: vaccineeFields,
                  onChange: clearGroupByFields,
                }}
              />
              <SelectField
                key="groupByFields"
                fieldConfig={{
                  name: 'groupByFields',
                  displayName: 'Group by fields',
                  multi: true,
                  options: this.getGroupByFields(values),
                }}
              />
              { values.ivrProviderConfig
                && this.renderProviderParamsMap(values.ivrProviderConfig,
                  this.getFieldsForParamsMap(values))}
              {_.map(this.getFields(),
                elem => (elem.fieldType === ARRAY ? this.renderArrayField(elem)
                  : renderFormField(elem)))}
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
                onClick={() => this.props.history.push('/callConfigTable')}
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
  fieldConfig: getFieldConfigByEntity(state, { entityType: VACCINEE_ENTITY }),
  ivrProviderConfigs: state.ivrProviderConfig.ivrProviderConfigs,
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { fetchEntity, fetchAllIvrProviderConfigs })(CallConfigForm),
);

CallConfigForm.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  callConfig: PropTypes.shape({}),
  ivrProviderConfigs: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  fieldConfig: PropTypes.shape({}),
  fetchEntity: PropTypes.func.isRequired,
  fetchAllIvrProviderConfigs: PropTypes.func.isRequired,
};

CallConfigForm.defaultProps = {
  callConfig: {},
  fieldConfig: {},
};
