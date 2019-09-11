import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authenticate from '../auth/authenticate-token';

const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
  const isAuthenticated = () => {
    authenticate();
    return authenticated; // Placeholder
  };

  return (
    <Route
      {...props}
      render={pr => (isAuthenticated()
        ? <Component {...pr} />
        : <Redirect to="/login" />)
      }
    />
  );
};

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  authenticated: false,
};

export default connect(mapStateToProps)(PrivateRoute);
