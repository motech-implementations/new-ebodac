import React, { Component } from 'react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import Alert from 'react-s-alert';
import Select from '../../utils/inputs/select';
import {
  SITE_ENTITY,
  VACCINEE_ENTITY,
  VISIT_ENTITY,
  KEY_COMMUNITY_PERSON_ENTITY,
} from '../../constants/entity-types';
import CsvConfigPage from './csv-config-page';
import { createCsvConfig } from '../../actions/csv-config-actions';

const ALERT_TIMEOUT = 5000;

const ENTITY_TYPES = [
  { label: 'Vaccinee', value: VACCINEE_ENTITY },
  { label: 'Visit', value: VISIT_ENTITY },
  { label: 'Site', value: SITE_ENTITY },
  { label: 'Key Community Person', value: KEY_COMMUNITY_PERSON_ENTITY },
];

class CsvConfigCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entity: '',
      initialFields: {},
    };
  }

  initiateCsvConfigFields = (entityType) => {
    const fieldConfig = this.props.fieldConfigs[entityType];
    const initialFields = _.chain(fieldConfig)
      .filter(elem => elem.required)
      .map(elem => ({
        fieldConfigId: elem.id,
        fieldName: '',
        format: '',
        defaultValue: '',
        keyField: false,
      }))
      .value();
    this.setState({ initialFields });
  };

  onChange = (entity) => {
    this.setState({ entity });
    this.initiateCsvConfigFields(entity);
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
      <div>
        <h1>Create CSV Config</h1>
        <div className="d-flex flex-row input-row required">
          <span className="col-form-label text-right nebodac-label">
            Entity
          </span>
          <div className="nebodac-input">
            <Select
              options={ENTITY_TYPES}
              value={this.state.entity}
              onChange={this.onChange}
            />
          </div>
        </div>
        <CsvConfigPage
          isNew
          onSubmit={this.onSubmit}
          entityType={this.state.entity}
          csvConfig={{
            entity: this.state.entity,
            csvFields: this.state.initialFields,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fieldConfigs: state.fieldConfig,
});

export default withRouter(
  connect(mapStateToProps, { createCsvConfig })(CsvConfigCreate),
);

CsvConfigCreate.propTypes = {
  createCsvConfig: PropTypes.func.isRequired,
  fieldConfigs: PropTypes.shape(),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

CsvConfigCreate.defaultProps = {
  fieldConfigs: {},
};
