import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ROLE_ENTITY } from '../../utils/entity-types';
import roleFieldConfig from '../../utils/field-configs';
import EntityEdit from '../entities/entity-edit';

const RoleEditPage = ({ match: { params: { id } } }) => (
  <EntityEdit
    entityType={ROLE_ENTITY}
    entityId={id}
    fieldConfig={roleFieldConfig}
  />
);

export default connect(null)(RoleEditPage);

RoleEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
