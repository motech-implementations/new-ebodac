import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';

import renderFormField, { validate } from '../../utils/form/form-utils';
import { fetchAppSettings, updateAppSettings } from '../../actions/app-settings-actions';
import { BOOLEAN, TEXT, TIME } from '../../constants/field-types';

const ALERT_TIMEOUT = 5000;

class AppSettings extends Component {
  componentDidMount() {
    this.props.fetchAppSettings();
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
      base: true,
      editable: true,
      filterable: true,
      required: false,
      hidden: false,
      fieldType: BOOLEAN,
      entity: 'appSettings',
      displayName: 'Send IVR Messages',
      name: 'sendIvrMessages',
      fieldOrder: 0,
      relatedEntity: null,
      relatedField: null,
      format: '',
    },
    {
      base: true,
      editable: true,
      filterable: true,
      required: sendIvrMessages,
      hidden: !sendIvrMessages,
      fieldType: TEXT,
      entity: 'appSettings',
      displayName: 'Call Config Name',
      name: 'callConfigName',
      fieldOrder: 1,
      relatedEntity: null,
      relatedField: null,
      format: '',
    },
    {
      base: true,
      editable: true,
      filterable: true,
      required: sendIvrMessages,
      hidden: !sendIvrMessages,
      fieldType: TIME,
      entity: 'appSettings',
      displayName: 'IVR Message Time',
      name: 'ivrMessageTime',
      fieldOrder: 2,
      relatedEntity: null,
      relatedField: null,
      format: 'HH:mm',
    },
    {
      base: true,
      editable: true,
      filterable: true,
      required: false,
      hidden: false,
      fieldType: BOOLEAN,
      entity: 'appSettings',
      displayName: 'Generate Reports',
      name: 'generateReports',
      fieldOrder: 3,
      relatedEntity: null,
      relatedField: null,
      format: '',
    },
    {
      base: true,
      editable: true,
      filterable: true,
      required: generateReports,
      hidden: !generateReports,
      fieldType: TIME,
      entity: 'appSettings',
      displayName: 'Reports Generation Time',
      name: 'reportsGenerationTime',
      fieldOrder: 2,
      relatedEntity: null,
      relatedField: null,
      format: 'HH:mm',
    },
  ];

  validate = values => validate(this.getFields(values))(values);

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
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit} className="modal-fields">
                <div>
                  {_.map(this.getFields(values), elem => renderFormField(elem))}
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
});

export default withRouter(
  connect(mapStateToProps, { fetchAppSettings, updateAppSettings })(AppSettings),
);

AppSettings.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  updateAppSettings: PropTypes.func.isRequired,
  fetchAppSettings: PropTypes.func.isRequired,
  appSettings: PropTypes.shape({}),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

AppSettings.defaultProps = {
  appSettings: null,
};
