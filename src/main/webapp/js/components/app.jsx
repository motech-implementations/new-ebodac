import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.scss';

import AppContent from './app-content';
import loadIcons from '../utils/icon-loader';
import { fetchAllFieldConfigs, fetchEntity } from '../actions/index';
import {
  PERMISSION_ENTITY,
  LANGUAGE_ENTITY,
  GROUP_ENTITY,
  ROLE_ENTITY,
} from '../constants/entity-types';
import Login from './auth/login';

loadIcons();

const ENTITY_ARRAY = [
  PERMISSION_ENTITY,
  LANGUAGE_ENTITY,
  GROUP_ENTITY,
  ROLE_ENTITY,
];

class App extends Component {
  componentDidUpdate() {
    const { fieldConfigFetched, fieldConfigFetching } = this.props;
    if (this.props.authenticated && !fieldConfigFetched && !fieldConfigFetching) {
      this.props.fetchAllFieldConfigs();
    }
    ENTITY_ARRAY.forEach((entity) => {
      const isFetched = this.props.metadata[entity].fetched;
      const isFetching = this.props.metadata[entity].fetching;
      if (this.props.authenticated && !isFetched && !isFetching) {
        this.props.fetchEntity(entity);
      }
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={AppContent} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  fieldConfigFetched: state.fieldConfig.fieldConfigFetched,
  fieldConfigFetching: state.fieldConfig.fieldConfigFetching,
  authenticated: state.auth.authenticated,
  metadata: state.entity.metadata,
});

export default connect(mapStateToProps, { fetchAllFieldConfigs, fetchEntity })(App);

App.propTypes = {
  fetchAllFieldConfigs: PropTypes.func.isRequired,
  fetchEntity: PropTypes.func.isRequired,
  fieldConfigFetched: PropTypes.bool.isRequired,
  fieldConfigFetching: PropTypes.bool.isRequired,
  metadata: PropTypes.shape({
    vaccinee: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
    visit: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
    language: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
    keyCommunityPerson: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
    site: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
    visitType: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
    group: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
    role: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
    permission: PropTypes.shape({
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  authenticated: PropTypes.bool.isRequired,
};
