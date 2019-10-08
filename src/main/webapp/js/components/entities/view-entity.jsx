import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-table/react-table.css';

import { getVisibleFields } from '../../selectors';

import EntityTable from './entity-table';

const ViewEntity = props => (
  <EntityTable entityType={props.match.params.entityType} fieldConfig={props.fieldConfig} />
);

const mapStateToProps = (state, props) => ({
  fieldConfig: getVisibleFields(state, {
    entityType: props.match.params.entityType,
  }),
});

export default connect(mapStateToProps)(ViewEntity);

ViewEntity.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
    }),
  }).isRequired,
};
