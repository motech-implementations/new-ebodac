import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FieldConfigPage from './field-config-page';
import {
  fetchFieldConfig, saveFieldConfig, deleteFieldConfig, createFieldConfig,
} from '../../actions/index';

import {
  FETCH_VACCINEE_CONFIG,
  CREATE_VACCINEE_CONFIG,
  SAVE_VACCINEE_CONFIG,
  DELETE_VACCINEE_CONFIG,
} from '../../actions/types';

const VACCINEE = 'VACCINEE';

class VaccineeFields extends Component {
  fetchFieldConfig = (callback) => {
    this.props.fetchFieldConfig(VACCINEE, FETCH_VACCINEE_CONFIG, callback);
  };

  createFieldConfig = (item) => {
    this.props.createFieldConfig(CREATE_VACCINEE_CONFIG, item);
  };

  saveFieldConfig = (item) => {
    this.props.saveFieldConfig(SAVE_VACCINEE_CONFIG, item);
  };

  deleteFieldConfig = (item, callback) => {
    this.props.deleteFieldConfig(DELETE_VACCINEE_CONFIG, item, callback);
  };

  render() {
    const { fieldConfigs } = this.props;
    return (
      <div className="container-fluid">
        <FieldConfigPage
          fetchFieldConfig={this.fetchFieldConfig}
          createFieldConfig={this.createFieldConfig}
          saveFieldConfig={this.saveFieldConfig}
          deleteFieldConfig={this.deleteFieldConfig}
          fieldConfigs={fieldConfigs}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fieldConfigs: state.fieldConfigs.vaccinee,
  };
}

export default connect(mapStateToProps,
  {
    fetchFieldConfig, saveFieldConfig, deleteFieldConfig, createFieldConfig,
  })(VaccineeFields);

VaccineeFields.propTypes = {
  fetchFieldConfig: PropTypes.func.isRequired,
  createFieldConfig: PropTypes.func.isRequired,
  saveFieldConfig: PropTypes.func.isRequired,
  deleteFieldConfig: PropTypes.func.isRequired,
  fieldConfigs: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};
