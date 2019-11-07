import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

import { withRouter } from 'react-router-dom';
import CsvConfigPage from './csv-config-page';
import { getCsvConfigById } from '../../selectors';
import { deleteCsvConfig, saveCsvConfig } from '../../actions/csv-config-actions';

class CsvConfigUpdate extends Component {
  deleteConfig = () => {
    this.props.deleteCsvConfig(this.props.csvConfig.entity, this.props.csvConfig.id);
    this.props.history.push('/csvConfigTable');
  };

  onSubmit = (values) => {
    this.props.saveCsvConfig(this.props.csvConfig.entity, values);
  };

  render() {
    return (
      <div className="container-fluid">
        <div>
          <h1>Update CSV Config</h1>
          <button
            type="button"
            className="btn btn-danger float-right"
            onClick={() => { this.deleteConfig(); }}
          >
            Delete config
          </button>
        </div>
        <div className="input-row required">
          <span className="col-md-2 col-form-label">Entity</span>
          <div style={{ fontSize: '20px' }}>
            {' '}
            {this.props.csvConfig.entity}
            {' '}
          </div>
        </div>
        <CsvConfigPage
          onSubmit={this.onSubmit}
          entityType={this.props.csvConfig.entity}
          csvConfig={this.props.csvConfig}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  csvConfig: getCsvConfigById(state,
    { entity: props.match.params.entity, csvConfigId: props.match.params.id }),
  fieldConfig: state.fieldConfig,
});

export default withRouter(
  connect(mapStateToProps, { deleteCsvConfig, saveCsvConfig })(CsvConfigUpdate),
);

CsvConfigUpdate.propTypes = {
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
