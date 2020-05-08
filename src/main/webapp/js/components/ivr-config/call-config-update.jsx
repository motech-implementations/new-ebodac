import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';

import CallConfigPage from './call-config-form';
import { saveCallConfig, deleteCallConfig } from '../../actions/call-config-actions';
import ConfirmModal from '../comfirm-modal';

const ALERT_TIMEOUT = 5000;

class CallConfigUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openConfirmModal: false,
    };
  }

  hideConfirmModal = () => {
    this.setState({ openConfirmModal: false });
  };

  openConfirmModal = () => {
    this.setState({ openConfirmModal: true });
  };

  deleteConfig = () => {
    this.props.deleteCallConfig(this.props.callConfig.id, () => {
      Alert.success('Call config has been deleted!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/callConfigTable');
    });
  };

  onSubmit = (values) => {
    this.props.saveCallConfig(values, () => {
      Alert.success('Call config has been updated!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/callConfigTable');
    });
  };

  render() {
    const { isOnline } = this.props;
    const { openConfirmModal } = this.state;

    return (
      <div className="container-fluid">
        <div>
          <h1>Update Call Config</h1>
        </div>
        <div className="ml-2 mt-2 mb-3">
          <button
            type="button"
            className="btn btn-danger"
            disabled={!isOnline}
            onClick={() => this.openConfirmModal()}
          >
            Delete config
          </button>
        </div>
        <CallConfigPage
          onSubmit={this.onSubmit}
          callConfig={this.props.callConfig}
        />
        <ConfirmModal
          showModal={openConfirmModal}
          modalText="Are you sure to delete Call Config?"
          onConfirm={() => this.deleteConfig()}
          onHide={() => this.hideConfirmModal()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  callConfig: state.callConfig.callConfigs[props.match.params.id],
  fieldConfig: state.fieldConfig,
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { saveCallConfig, deleteCallConfig })(CallConfigUpdate),
);

CallConfigUpdate.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  callConfig: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      entity: PropTypes.string,
    }),
  }).isRequired,
  deleteCallConfig: PropTypes.func.isRequired,
  saveCallConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
