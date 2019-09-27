import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-table/react-table.css';

import { fetchEntity, fetchFieldConfig } from '../../actions';
import { getVisibleFields } from '../../selectors';
import { LANGUAGE_ENTITY, GROUP_ENTITY } from '../../utils/entity-types';

import EntityTable from './entity-table';

class ViewEntity extends Component {
  componentDidMount() {
    this.props.fetchEntity(LANGUAGE_ENTITY); // temporary solution until sync is done
    // assumption is that at this point all entities are available
    this.props.fetchEntity(GROUP_ENTITY);
    this.props.fetchFieldConfig(this.props.match.params.entityType);
  }

  render() {
    const { fieldConfig } = this.props;
    return (
      <EntityTable entityType={this.props.match.params.entityType} fieldConfig={fieldConfig} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  fieldConfig: getVisibleFields(state, {
    entityType: props.match.params.entityType,
  }),
});

export default connect(mapStateToProps, { fetchEntity, fetchFieldConfig })(ViewEntity);

ViewEntity.propTypes = {
  fetchEntity: PropTypes.func.isRequired,
  fetchFieldConfig: PropTypes.func.isRequired,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
    }),
  }).isRequired,
};
