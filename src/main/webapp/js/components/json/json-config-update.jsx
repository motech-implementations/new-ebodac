import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';

import JsonConfigPage from './json-config-page';
import { getJsonConfigById } from '../../selectors';
import { deleteJsonConfig, saveJsonConfig } from '../../actions/json-config-actions';
import ConfirmModal from '../comfirm-modal';

const ALERT_TIMEOUT = 5000;

class JsonConfigUpdate extends Component {
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
    this.props.deleteJsonConfig(this.props.jsonConfig.entity, this.props.jsonConfig.id, () => {
      Alert.success('Json config has been deleted!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/jsonConfigTable');
    });
  };

  onSubmit = (values) => {
    this.props.saveJsonConfig(this.props.jsonConfig.entity, values, () => {
      Alert.success('Json config has been updated!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/jsonConfigTable');
    });
  };

  render() {
    const { openConfirmModal } = this.state;
    const { isOnline } = this.props;
    return (
      <div className="container-fluid">
        <div>
          <h1>Update Json Config</h1>
        </div>
        <div className="ml-2 mt-2 mb-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.openConfirmModal()}
            disabled={!isOnline}
          >
            Delete config
          </button>
        </div>
        <div className="input-row required">
          <span className="col-md-2 col-form-label">Entity</span>
          <div style={{ fontSize: '20px' }}>
            {' '}
            {_.startCase(this.props.jsonConfig.entity)}
            {' '}
          </div>
        </div>
        <JsonConfigPage
          onSubmit={this.onSubmit}
          entityType={this.props.jsonConfig.entity}
          jsonConfig={this.props.jsonConfig}
        />
        <ConfirmModal
          showModal={openConfirmModal}
          modalText="Are you sure to delete json Config?"
          onConfirm={() => this.deleteConfig()}
          onHide={() => this.hideConfirmModal()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  jsonConfig: getJsonConfigById(state,
    { entity: props.match.params.entity, jsonConfigId: props.match.params.id }),
  fieldConfig: state.fieldConfig,
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { deleteJsonConfig, saveJsonConfig })(JsonConfigUpdate),
);

JsonConfigUpdate.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  jsonConfig: PropTypes.shape({
    id: PropTypes.string,
    entity: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      entity: PropTypes.string,
    }),
  }).isRequired,
  deleteJsonConfig: PropTypes.func.isRequired,
  saveJsonConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
