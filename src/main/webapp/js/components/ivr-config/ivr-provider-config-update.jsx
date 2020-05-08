import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';

import IvrProviderConfigPage from './ivr-provider-config-form';
import { saveIvrProviderConfig, deleteIvrProviderConfig } from '../../actions/ivr-provider-config-actions';
import ConfirmModal from '../comfirm-modal';

const ALERT_TIMEOUT = 5000;

class IvrProviderConfigUpdate extends Component {
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
    this.props.deleteIvrProviderConfig(this.props.ivrProviderConfig.id, () => {
      Alert.success('IVR provider config has been deleted!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/ivrProviderConfigTable');
    });
  };

  onSubmit = (values) => {
    this.props.saveIvrProviderConfig(values, () => {
      Alert.success('IVR provider config has been updated!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/ivrProviderConfigTable');
    });
  };

  render() {
    const { isOnline } = this.props;
    const { openConfirmModal } = this.state;

    return (
      <div className="container-fluid">
        <div>
          <h1>Update IVR Provider Config</h1>
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
        <IvrProviderConfigPage
          onSubmit={this.onSubmit}
          ivrProviderConfig={this.props.ivrProviderConfig}
        />
        <ConfirmModal
          showModal={openConfirmModal}
          modalText="Are you sure to delete IVR Provider Config?"
          onConfirm={() => this.deleteConfig()}
          onHide={() => this.hideConfirmModal()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ivrProviderConfig: state.ivrProviderConfig.ivrProviderConfigs[props.match.params.id],
  fieldConfig: state.fieldConfig,
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps,
    { saveIvrProviderConfig, deleteIvrProviderConfig })(IvrProviderConfigUpdate),
);

IvrProviderConfigUpdate.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  ivrProviderConfig: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      entity: PropTypes.string,
    }),
  }).isRequired,
  deleteIvrProviderConfig: PropTypes.func.isRequired,
  saveIvrProviderConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
