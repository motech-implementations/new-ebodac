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
  KEY_COMMUNITY_PERSON_ENTITY,
} from '../../constants/entity-types';
import JsonConfigPage from './json-config-page';
import { createJsonConfig } from '../../actions/json-config-actions';

const ALERT_TIMEOUT = 5000;

const ENTITY_TYPES = [
  { label: 'Vaccinee', value: VACCINEE_ENTITY },
  { label: 'Visit', value: VISIT_ENTITY },
  { label: 'Site', value: SITE_ENTITY },
  { label: 'Key Community Person', value: KEY_COMMUNITY_PERSON_ENTITY },
];

class JsonConfigCreate extends Component {
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
    this.props.createJsonConfig(this.state.entity, values, () => {
      Alert.success('Json config has been created!', {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push('/jsonConfigTable');
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <h1>Create Json Config</h1>
        <div className="input-row required">
          <span className="col-md-2 col-form-label">Entity</span>
        </div>
        <Select
          options={ENTITY_TYPES}
          value={this.state.entity}
          onChange={this.onChange}
          className="my-2"
        />
        <JsonConfigPage
          isNew
          onSubmit={this.onSubmit}
          entityType={this.state.entity}
          jsonConfig={{ entity: this.state.entity }}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(null, { createJsonConfig })(JsonConfigCreate),
);

JsonConfigCreate.propTypes = {
  createJsonConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
