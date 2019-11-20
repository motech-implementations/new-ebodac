import React, { Component } from 'react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Alert from 'react-s-alert';
import Select from '../../utils/inputs/select';
import {
  SITE_ENTITY,
  VACCINEE_ENTITY,
  VISIT_ENTITY,
} from '../../constants/entity-types';
import CsvConfigPage from './csv-config-page';
import { createCsvConfig } from '../../actions/csv-config-actions';

const ALERT_TIMEOUT = 5000;

const ENTITY_TYPES = [
  { label: 'Vaccinee', value: VACCINEE_ENTITY },
  { label: 'Visit', value: VISIT_ENTITY },
  { label: 'Site', value: SITE_ENTITY },
];

class CsvConfigCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entity: '',
    };
  }

  onChange = (entity) => {
    this.setState({ entity });
  };

  onSubmit = (values) => {
    this.props.createCsvConfig(this.state.entity, values, () => {
      Alert.success('CSV config has been created!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/csvConfigTable');
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <h1>Create CSV Config</h1>
        <div className="input-row required">
          <span className="col-md-2 col-form-label">Entity</span>
        </div>
        <Select
          options={ENTITY_TYPES}
          value={this.state.entity}
          onChange={this.onChange}
          className="my-2"
        />
        <CsvConfigPage
          isNew
          onSubmit={this.onSubmit}
          entityType={this.state.entity}
          csvConfig={{ entity: this.state.entity }}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(null, { createCsvConfig })(CsvConfigCreate),
);

CsvConfigCreate.propTypes = {
  createCsvConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
