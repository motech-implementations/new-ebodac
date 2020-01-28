import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getEntityMemberById, getVisibleFields } from '../../../selectors';
import EntityEdit from '../entity-edit';
import { USER_ENTITY } from '../../../constants/entity-types';

function UserEdit({ fieldConfig, entityToEdit, match: { params: { id } } }) {
  const isAdmin = entityToEdit.username === 'admin';
  const newFieldConfig = _.map(fieldConfig, elem => ({
    ...elem,
    editable: (elem.name === 'name' || elem.name === 'email' || elem.name === 'password'),
  }));
  return (
    <EntityEdit
      entityType={USER_ENTITY}
      entityId={id}
      fieldConfig={isAdmin ? newFieldConfig : fieldConfig}
      disableDelete={isAdmin}
    />
  );
}

const mapStateToProps = (state, props) => ({
  entityToEdit: getEntityMemberById(state, {
    entityType: USER_ENTITY,
    entityId: props.match.params.id,
  }),
  fieldConfig: getVisibleFields(state, { entityType: USER_ENTITY }),
});

export default connect(mapStateToProps)(UserEdit);

UserEdit.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  entityToEdit: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
