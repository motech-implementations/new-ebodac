import React, { Component } from 'react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Alert from 'react-s-alert';
import CallConfigPage from './call-config-form';
import { createCallConfig } from '../../actions/call-config-actions';

const ALERT_TIMEOUT = 5000;

class CallConfigCreate extends Component {
  onSubmit = (values) => {
    this.props.createCallConfig(values, () => {
      Alert.success('Call config has been created!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/callConfigTable');
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <h1>Create Call Config</h1>
        <CallConfigPage
          onSubmit={this.onSubmit}
          callConfig={{}}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(null, { createCallConfig })(CallConfigCreate),
);

CallConfigCreate.propTypes = {
  createCallConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
