import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import RoutePrivate from './RoutePrivate';

const EntityRoutePrivate = ({ readOnly, ...props }) => {
  const getRole = () => {
    const entityType = _.get(props, 'computedMatch.params.entityType', null);
    if (entityType && readOnly) {
      return [`ROLE_${entityType}_READ`];
    }
    if (entityType) {
      return [`ROLE_${entityType}_WRITE`];
    }
    return [];
  };

  return (
    <RoutePrivate {...props} requiredPermissions={getRole()} />
  );
};

EntityRoutePrivate.propTypes = {
  readOnly: PropTypes.bool,
  computedMatch: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
    }),
  }),
};

EntityRoutePrivate.defaultProps = {
  readOnly: false,
  computedMatch: {
    params: {
      entityType: null,
    },
  },
};

export default withRouter(EntityRoutePrivate);
