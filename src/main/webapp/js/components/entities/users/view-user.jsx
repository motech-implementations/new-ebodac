import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-table/react-table.css';

import { getVisibleFields } from '../../../selectors';
import EntityTable from '../entity-table';
import { USER_ENTITY } from '../../../constants/entity-types';

const ViewUser = props => (
  <EntityTable
    entityType={USER_ENTITY}
    fieldConfig={props.fieldConfig}
    disableExport
  />
);

const mapStateToProps = state => ({
  fieldConfig: getVisibleFields(state, {
    entityType: USER_ENTITY,
  }),
});

export default connect(mapStateToProps)(ViewUser);

ViewUser.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
