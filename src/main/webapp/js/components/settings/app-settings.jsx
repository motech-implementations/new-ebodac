import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';

import renderFormField from '../../utils/form/form-utils';
import { fetchAppSettings, updateAppSettings } from '../../actions/app-settings-actions';
import { TIME } from '../../constants/field-types';

const ALERT_TIMEOUT = 5000;

export const fieldConfig = [{
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TIME,
  entity: 'appSettings',
  displayName: 'IVR Message Time',
  name: 'ivrMessageTime',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: 'HH:mm',
},
];

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

  render() {
    const { appSettings } = this.props;
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
            initialValues={appSettings}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="modal-fields">
                <div>
                  {_.map(fieldConfig, elem => renderFormField(elem))}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg margin-top-sm padding-left-lg padding-right-lg margin-right-sm"
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
});

export default withRouter(
  connect(mapStateToProps, { fetchAppSettings, updateAppSettings })(AppSettings),
);

AppSettings.propTypes = {
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
