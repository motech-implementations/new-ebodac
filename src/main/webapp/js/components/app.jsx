import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.scss';

import AppContent from './app-content';
import loadIcons from '../utils/icon-loader';

import Login from './auth/login';
import Register from './auth/register';
import AccessDeniedPage from './auth/AccessDeniedPage';
import RoutePrivate from './helpers/RoutePrivate';

loadIcons();

const App = ({ authenticated }) => (
  <Router>
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/accessDenied" component={AccessDeniedPage} />
      {!authenticated && <Route path="/" component={Login} />}
      <RoutePrivate path="/" component={AppContent} />
    </Switch>
  </Router>
);

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
