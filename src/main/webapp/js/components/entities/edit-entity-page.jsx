import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVisibleFields } from '../../selectors';
import EntityEdit from './entity-edit';

const EditEntityPage = ({ fieldConfig, match: { params: { id, entityType } } }) => (
  <EntityEdit
    entityType={entityType}
    entityId={id}
    fieldConfig={fieldConfig}
  />
);

const mapStateToProps = (state, props) => ({
  fieldConfig: getVisibleFields(state, { entityType: props.match.params.entityType }),
});

export default connect(mapStateToProps)(EditEntityPage);

EditEntityPage.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
};
