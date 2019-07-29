import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {

  function isAuthenticated(arr) {
    return true; //Placeholder
  }

  return (
    <Route
      {...props}
      render={() =>
        isAuthenticated(props.authArray) ?
          <Component />
          :
          <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
