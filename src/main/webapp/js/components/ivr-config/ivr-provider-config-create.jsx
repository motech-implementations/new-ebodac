import React, { Component } from 'react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Alert from 'react-s-alert';
import IvrProviderConfigPage from './ivr-provider-config-form';
import { createIvrProviderConfig } from '../../actions/ivr-provider-config-actions';

const ALERT_TIMEOUT = 5000;

class IvrProviderConfigCreate extends Component {
  onSubmit = (values) => {
    this.props.createIvrProviderConfig(values, () => {
      Alert.success('IVR provider config has been created!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/ivrProviderConfigTable');
    });
  };

  render() {
    return (
      <div>
        <h1>Create IVR Provider Config</h1>
        <IvrProviderConfigPage
          onSubmit={this.onSubmit}
          ivrProviderConfig={{}}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(null, { createIvrProviderConfig })(IvrProviderConfigCreate),
);

IvrProviderConfigCreate.propTypes = {
  createIvrProviderConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
