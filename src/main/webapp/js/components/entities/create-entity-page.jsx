import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVisibleFields } from '../../selectors';
import EntityCreate from './entity-create';

const CreateEntityPage = ({ fieldConfig, match: { params: { entityType } } }) => (
  <EntityCreate
    entityType={entityType}
    fieldConfig={fieldConfig}
  />
);

const mapStateToProps = (state, props) => ({
  fieldConfig: getVisibleFields(state, { entityType: props.match.params.entityType }),
});

export default connect(mapStateToProps)(CreateEntityPage);

CreateEntityPage.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
    }),
  }).isRequired,
};
