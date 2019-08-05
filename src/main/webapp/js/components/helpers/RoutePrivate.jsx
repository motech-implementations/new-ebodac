import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  function isAuthenticated() {
    return true; // Placeholder
  }

  return (
    <Route
      {...props}
      render={() => (isAuthenticated()
        ? <Component />
        : <Redirect to="/" />)
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
