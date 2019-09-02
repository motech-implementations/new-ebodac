import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FieldConfigPage from './field-config-page';
import {
  fetchFieldConfig, saveFieldConfig, deleteFieldConfig, createFieldConfig,
} from '../../actions/index';

import {
  FETCH_KCP_CONFIG,
  CREATE_KCP_CONFIG,
  SAVE_KCP_CONFIG,
  DELETE_KCP_CONFIG,
} from '../../actions/types';

const KEY_COMMUNITY_PERSON = 'PERSON';

class KeyCommunityPersonFields extends Component {
  fetchFieldConfig = (callback) => {
    this.props.fetchFieldConfig(KEY_COMMUNITY_PERSON, FETCH_KCP_CONFIG, callback);
  };

  createFieldConfig = (item) => {
    this.props.createFieldConfig(CREATE_KCP_CONFIG, item);
  };

  saveFieldConfig = (item) => {
    this.props.saveFieldConfig(SAVE_KCP_CONFIG, item);
  };

  deleteFieldConfig = (item, callback) => {
    this.props.deleteFieldConfig(DELETE_KCP_CONFIG, item, callback);
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
    fieldConfigs: state.fieldConfigs.keyCommunityPerson,
  };
}

export default connect(mapStateToProps,
  {
    fetchFieldConfig, saveFieldConfig, deleteFieldConfig, createFieldConfig,
  })(KeyCommunityPersonFields);

KeyCommunityPersonFields.propTypes = {
  fetchFieldConfig: PropTypes.func.isRequired,
  createFieldConfig: PropTypes.func.isRequired,
  saveFieldConfig: PropTypes.func.isRequired,
  deleteFieldConfig: PropTypes.func.isRequired,
  fieldConfigs: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};
