import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-table/react-table.css';

import { getVisibleFields } from '../../../selectors';
import EntityTable from '../entity-table';
import { ROLE_ENTITY } from '../../../constants/entity-types';

const ViewRole = props => (
  <EntityTable
    entityType={ROLE_ENTITY}
    fieldConfig={props.fieldConfig}
    disableExport
  />
);

const mapStateToProps = state => ({
  fieldConfig: getVisibleFields(state, {
    entityType: ROLE_ENTITY,
  }),
});

export default connect(mapStateToProps)(ViewRole);

ViewRole.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
