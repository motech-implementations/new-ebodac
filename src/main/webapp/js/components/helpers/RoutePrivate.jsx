import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authenticate from '../auth/authenticate-token';

const PrivateRoute = ({
  component: Component,
  requiredPermissions,
  authenticated,
  permissions,
  ...props
}) => {
  const hasPermission = () => {
    if (_.isEmpty(requiredPermissions)) {
      return true;
    }
    return _.every(requiredPermissions, permission => _.includes(permissions, permission));
  };

  const hasAccess = () => {
    authenticate();
    return authenticated && hasPermission();
  };

  return (
    <Route
      {...props}
      render={
        pr => (hasAccess()
          ? <Component {...pr} />
          : <Redirect to="/login" />)
      }
    />
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  permissions: state.auth.permissions,
});

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool,
  requiredPermissions: PropTypes.arrayOf(PropTypes.string),
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PrivateRoute.defaultProps = {
  authenticated: false,
  requiredPermissions: [],

};

export default connect(mapStateToProps)(PrivateRoute);
