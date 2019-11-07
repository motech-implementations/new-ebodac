import React, { Component } from 'react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '../../utils/inputs/select';
import {
  SITE_ENTITY,
  VACCINEE_ENTITY,
  VISIT_ENTITY,
} from '../../constants/entity-types';
import CsvConfigPage from './csv-config-page';
import { createCsvConfig } from '../../actions/csv-config-actions';

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
    this.props.createCsvConfig(this.state.entity, values);
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

export default connect(null, { createCsvConfig })(CsvConfigCreate);

CsvConfigCreate.propTypes = {
  createCsvConfig: PropTypes.func.isRequired,
};
