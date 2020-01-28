import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getEntityMemberById, getVisibleFields } from '../../../selectors';
import EntityEdit from '../entity-edit';
import { ROLE_ENTITY } from '../../../constants/entity-types';

function RoleEdit({ fieldConfig, entityToEdit, match: { params: { id } } }) {
  const isAdmin = entityToEdit.name === 'Admin';
  const newFieldConfig = _.map(fieldConfig, elem => ({
    ...elem,
    editable: false,
  }));
  return (
    <EntityEdit
      entityType={ROLE_ENTITY}
      entityId={id}
      fieldConfig={isAdmin ? newFieldConfig : fieldConfig}
      disableDelete={isAdmin}
    />
  );
}

const mapStateToProps = (state, props) => ({
  entityToEdit: getEntityMemberById(state, {
    entityId: props.match.params.id,
    entityType: ROLE_ENTITY,
  }),
  fieldConfig: getVisibleFields(state, { entityType: ROLE_ENTITY }),
});
export default connect(mapStateToProps)(RoleEdit);

RoleEdit.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  entityToEdit: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
