import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';

import CsvConfigPage from './csv-config-page';
import { getCsvConfigById } from '../../selectors';
import { deleteCsvConfig, saveCsvConfig } from '../../actions/csv-config-actions';
import ConfirmModal from '../comfirm-modal';

const ALERT_TIMEOUT = 5000;

class CsvConfigUpdate extends Component {
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
    this.props.deleteCsvConfig(this.props.csvConfig.entity, this.props.csvConfig.id, () => {
      Alert.success('CSV config has been deleted!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/csvConfigTable');
    });
  };

  onSubmit = (values) => {
    this.props.saveCsvConfig(this.props.csvConfig.entity, values, () => {
      Alert.success('CSV config has been updated!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/csvConfigTable');
    });
  };

  render() {
    const { isOnline } = this.props;
    const { openConfirmModal } = this.state;
    return (
      <div>
        <div>
          <h1>Update CSV Config</h1>
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
        <div className="d-flex flex-row input-row">
          <span className="col-form-label text-right nebodac-label">Entity</span>
          <div style={{ fontSize: '20px' }}>
            {' '}
            {_.startCase(this.props.csvConfig.entity)}
            {' '}
          </div>
        </div>
        <CsvConfigPage
          onSubmit={this.onSubmit}
          entityType={this.props.csvConfig.entity}
          csvConfig={this.props.csvConfig}
        />
        <ConfirmModal
          showModal={openConfirmModal}
          modalText="Are you sure to delete csv Config?"
          onConfirm={() => this.deleteConfig()}
          onHide={() => this.hideConfirmModal()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  csvConfig: getCsvConfigById(state,
    { entity: props.match.params.entity, csvConfigId: props.match.params.id }),
  fieldConfig: state.fieldConfig,
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { deleteCsvConfig, saveCsvConfig })(CsvConfigUpdate),
);

CsvConfigUpdate.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  csvConfig: PropTypes.shape({
    id: PropTypes.string,
    entity: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      entity: PropTypes.string,
    }),
  }).isRequired,
  deleteCsvConfig: PropTypes.func.isRequired,
  saveCsvConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
