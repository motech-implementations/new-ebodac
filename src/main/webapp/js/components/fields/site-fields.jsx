import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FieldConfigPage from './field-config-page';
import {
  fetchFieldConfig, saveFieldConfig, deleteFieldConfig, createFieldConfig,
} from '../../actions/index';

import {
  FETCH_SITE_CONFIG,
  CREATE_SITE_CONFIG,
  SAVE_SITE_CONFIG,
  DELETE_SITE_CONFIG,
} from '../../actions/types';

const SITE = 'SITE';

class SiteFields extends Component {
  fetchFieldConfig = (callback) => {
    this.props.fetchFieldConfig(SITE, FETCH_SITE_CONFIG, callback);
  };

  createFieldConfig = (item) => {
    this.props.createFieldConfig(CREATE_SITE_CONFIG, item);
  };

  saveFieldConfig = (item) => {
    this.props.saveFieldConfig(SAVE_SITE_CONFIG, item);
  };

  deleteFieldConfig = (item, callback) => {
    this.props.deleteFieldConfig(DELETE_SITE_CONFIG, item, callback);
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
    fieldConfigs: state.fieldConfigs.site,
  };
}

export default connect(mapStateToProps,
  {
    fetchFieldConfig,
    saveFieldConfig,
    deleteFieldConfig,
    createFieldConfig,
  })(SiteFields);

SiteFields.propTypes = {
  fetchFieldConfig: PropTypes.func.isRequired,
  createFieldConfig: PropTypes.func.isRequired,
  saveFieldConfig: PropTypes.func.isRequired,
  deleteFieldConfig: PropTypes.func.isRequired,
  fieldConfigs: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};
