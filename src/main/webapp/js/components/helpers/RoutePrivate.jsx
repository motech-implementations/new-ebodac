import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authenticate from '../auth/authenticate-token';

const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
  function isAuthenticated() {
    authenticate();
    return authenticated; // Placeholder
  }

  return (
    <Route
      {...props}
      render={() => (isAuthenticated()
        ? <Component />
        : <Redirect to="/login" />)
      }
    />
  );
};


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  authenticated: false,
};

export default connect(mapStateToProps)(PrivateRoute);
