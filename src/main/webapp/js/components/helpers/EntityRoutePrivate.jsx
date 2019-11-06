import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import RoutePrivate from './RoutePrivate';
import {
  getEntityReadPermission,
  getEntityWritePermission,
} from '../../utils/permission-helper';

const EntityRoutePrivate = ({ readOnly, ...props }) => {
  const getRole = () => {
    const entityType = _.get(props, 'computedMatch.params.entityType', null);
    if (entityType && readOnly) {
      return getEntityReadPermission(entityType);
    }
    if (entityType) {
      return getEntityWritePermission(entityType);
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
