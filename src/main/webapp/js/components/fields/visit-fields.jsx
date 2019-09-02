import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FieldConfigPage from './field-config-page';
import {
  fetchFieldConfig, saveFieldConfig, deleteFieldConfig, createFieldConfig,
} from '../../actions/index';

import {
  FETCH_VISIT_CONFIG,
  CREATE_VISIT_CONFIG,
  SAVE_VISIT_CONFIG,
  DELETE_VISIT_CONFIG,
} from '../../actions/types';

const VISIT = 'VISIT';

class VisitFields extends Component {
  fetchFieldConfig = (callback) => {
    this.props.fetchFieldConfig(VISIT, FETCH_VISIT_CONFIG, callback);
  };

  createFieldConfig = (item) => {
    this.props.createFieldConfig(CREATE_VISIT_CONFIG, item);
  };

  saveFieldConfig = (item) => {
    this.props.saveFieldConfig(SAVE_VISIT_CONFIG, item);
  };

  deleteFieldConfig = (item, callback) => {
    this.props.deleteFieldConfig(DELETE_VISIT_CONFIG, item, callback);
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
    fieldConfigs: state.fieldConfigs.visit,
  };
}

export default connect(mapStateToProps,
  {
    fetchFieldConfig, saveFieldConfig, deleteFieldConfig, createFieldConfig,
  })(VisitFields);

VisitFields.propTypes = {
  fetchFieldConfig: PropTypes.func.isRequired,
  createFieldConfig: PropTypes.func.isRequired,
  saveFieldConfig: PropTypes.func.isRequired,
  deleteFieldConfig: PropTypes.func.isRequired,
  fieldConfigs: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};
