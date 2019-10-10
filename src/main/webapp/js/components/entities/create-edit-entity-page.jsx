import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getVisibleFields } from '../../selectors';
import EntityEdit from './entity-edit';
import EntityCreate from './entity-create';

const CreateOrEditEntityPage = ({ fieldConfig, match: { params: { id, entityType } } }) => (
  _.isUndefined(id)
    ? (
      <EntityCreate
        entityType={entityType}
        fieldConfig={fieldConfig}
      />
    )
    : (
      <EntityEdit
        entityType={entityType}
        entityId={id}
        fieldConfig={fieldConfig}
      />
    )
);

const mapStateToProps = (state, props) => ({
  fieldConfig: getVisibleFields(state, { entityType: props.match.params.entityType }),
});

export default connect(mapStateToProps)(CreateOrEditEntityPage);

CreateOrEditEntityPage.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
};
