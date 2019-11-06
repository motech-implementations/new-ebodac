import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import '../../css/main.scss';

import {
  KEY_COMMUNITY_PERSON_ENTITY,
  SITE_ENTITY,
  VACCINEE_ENTITY,
  LANGUAGE_ENTITY,
  VISIT_ENTITY,
  ROLE_ENTITY,
  USER_ENTITY,
  VISIT_TYPE_ENTITY,
  CAMPAIGN_MESSAGE_ENTITY,
  GROUP_ENTITY,
} from '../constants/entity-types';
import { MANAGE_FIELD_CONFIG } from '../constants/permissions';
import { getEntityReadPermission } from '../utils/permission-helper';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrollmentCollapsed: true,
      visitsCollapsed: true,
      reportsCollapsed: true,
      userManagementCollapsed: true,
      settingsCollapsed: true,
      fieldsCollapsed: true,
    };
  }

  isAuthorizated = (requiredPermissions) => {
    const { permissions } = this.props;
    if (_.isEmpty(requiredPermissions)) {
      return true;
    }
    return _.every(requiredPermissions, permission => _.includes(permissions, permission));
  };

  toggleEnrollmentCollapsedMenu = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ enrollmentCollapsed: !prevState.enrollmentCollapsed }));
    return false;
  };

  toggleVisitsCollapsedMenu = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ visitsCollapsed: !prevState.visitsCollapsed }));
    return false;
  };

  toggleReportsCollapsedMenu = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ reportsCollapsed: !prevState.reportsCollapsed }));
    return false;
  };

  toggleUserManagementCollapsedMenu = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ userManagementCollapsed: !prevState.userManagementCollapsed }));
    return false;
  };

  toggleSettingsCollapsedMenu = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ settingsCollapsed: !prevState.settingsCollapsed }));
    return false;
  };

  toggleFieldsCollapsedMenu = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ fieldsCollapsed: !prevState.fieldsCollapsed }));
    return false;
  };

  renderEnrollmentCollapsedMenu = () => {
    const { enrollmentCollapsed } = this.state;

    if (enrollmentCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-second-level">
        <li className="border-none">
          <Link to="/keyCommunityPersonEnrollment">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Key Community Person Enrollment</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/vaccineeEnrollment">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Vaccinee Enrollment</span>
          </Link>
        </li>
      </ul>
    );
  };

  renderVisitsCollapsedMenu = () => {
    const { visitsCollapsed } = this.state;

    if (visitsCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-second-level">
        {this.isAuthorizated(getEntityReadPermission(VISIT_ENTITY))
        && (
          <li className="border-none">
            <Link to={`/viewEntity/${VISIT_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Visits</span>
            </Link>
          </li>
        )}
        {this.isAuthorizated(getEntityReadPermission(VISIT_TYPE_ENTITY))
        && (
          <li className="border-none">
            <Link to={`/viewEntity/${VISIT_TYPE_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Visit Types</span>
            </Link>
          </li>
        )}
        <li className="border-none">
          <Link to="/boosterVisitGenerator">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Booster Visit Generator</span>
          </Link>
        </li>
      </ul>
    );
  };

  renderReportsCollapsedMenu = () => {
    const { reportsCollapsed } = this.state;

    if (reportsCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-second-level">
        <li className="border-none">
          <Link to="/userLogs">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">User Logs</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/primeVaccination">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Prime Vaccination</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/clinicVisit">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Clinic Visit</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/callLogVaccinees">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Call Log - Vaccines</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/callLogCommunityPerson">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Call Log - Community Person</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/smsLogVaccinees">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">SMS Log - Vacciness</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/smsLogCommunityPerson">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">SMS Log - Community Person</span>
          </Link>
        </li>
      </ul>
    );
  };

  renderUserManagementCollapsedMenu = () => {
    const { userManagementCollapsed } = this.state;

    if (userManagementCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-second-level">
        {this.isAuthorizated(getEntityReadPermission(ROLE_ENTITY))
        && (
          <li className="border-none">
            <Link to={`/viewEntity/${ROLE_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Roles</span>
            </Link>
          </li>
        )}
        {this.isAuthorizated(getEntityReadPermission(USER_ENTITY))
        && (
          <li className="border-none">
            <Link to={`/viewEntity/${USER_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Users</span>
            </Link>
          </li>
        )}
      </ul>
    );
  };

  renderSettingsCollapsedMenu = () => {
    const { settingsCollapsed } = this.state;

    if (settingsCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-second-level">
        <li className="border-none">
          <Link to="/messaging">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Messaging</span>
          </Link>
        </li>
        {this.isAuthorizated(getEntityReadPermission(LANGUAGE_ENTITY))
        && (
          <li className="border-none">
            <Link to={`/viewEntity/${LANGUAGE_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Languages</span>
            </Link>
          </li>
        )}
        {this.isAuthorizated([MANAGE_FIELD_CONFIG])
          && (
          <li>
            <a href="" onClick={this.toggleFieldsCollapsedMenu}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Fields</span>
            </a>
            {this.renderFieldsCollapsedMenu()}
          </li>
          )}
        {this.isAuthorizated(getEntityReadPermission(SITE_ENTITY))
        && (
          <li className="border-none">
            <Link to={`/viewEntity/${SITE_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Sites</span>
            </Link>
          </li>
        )}
      </ul>
    );
  };

  renderFieldsCollapsedMenu = () => {
    const { fieldsCollapsed } = this.state;

    if (fieldsCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-third-level">
        <li className="border-none">
          <div className="third-level-item">
            <Link to={`/fieldConfig/${VACCINEE_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Vaccinee</span>
            </Link>
          </div>
        </li>
        <li className="border-none">
          <div className="third-level-item">
            <Link to={`/fieldConfig/${KEY_COMMUNITY_PERSON_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Key Community Persons</span>
            </Link>
          </div>
        </li>
        <li className="border-none">
          <div className="third-level-item">
            <Link to={`/fieldConfig/${SITE_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Sites</span>
            </Link>
          </div>
        </li>
        <li className="border-none">
          <div className="third-level-item">
            <Link to={`/fieldConfig/${VISIT_ENTITY}`}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Visit Schedule</span>
            </Link>
          </div>
        </li>
      </ul>
    );
  };

  render() {
    const { sidebarVisible } = this.props;

    return (
      <div className={`sidebar-collapse ${sidebarVisible ? 'collapse' : ''}`}>
        <div>
          <ul className="nav navbar-nav side-nav">
            {this.isAuthorizated(getEntityReadPermission(VACCINEE_ENTITY))
            && (
            <li>
              <Link to={`/viewEntity/${VACCINEE_ENTITY}`}>
                <FontAwesomeIcon icon="syringe" />
                <span className="icon-text">Vaccinees</span>
              </Link>
            </li>
            )}
            {this.isAuthorizated(getEntityReadPermission(KEY_COMMUNITY_PERSON_ENTITY))
            && (
              <li>
                <Link to={`/viewEntity/${KEY_COMMUNITY_PERSON_ENTITY}`}>
                  <FontAwesomeIcon icon="key" />
                  <span className="icon-text">Key Community Persons</span>
                </Link>
              </li>
            )}
            <li>
              <a href="" onClick={this.toggleEnrollmentCollapsedMenu}>
                <FontAwesomeIcon icon="user-plus" />
                <span className="icon-text">Enrollment</span>
              </a>
              {this.renderEnrollmentCollapsedMenu()}
            </li>
            <li>
              <a href="" onClick={this.toggleVisitsCollapsedMenu}>
                <FontAwesomeIcon icon="glasses" />
                <span className="icon-text">Visits</span>
              </a>
              {this.renderVisitsCollapsedMenu()}
            </li>
            {this.isAuthorizated(getEntityReadPermission(CAMPAIGN_MESSAGE_ENTITY))
            && (
              <li>
                <Link to={`/viewEntity/${CAMPAIGN_MESSAGE_ENTITY}`}>
                  <FontAwesomeIcon icon="envelope" />
                  <span className="icon-text">Message Campaigns</span>
                </Link>
              </li>
            )}
            <li>
              <a href="" onClick={this.toggleReportsCollapsedMenu}>
                <FontAwesomeIcon icon="file" />
                <span className="icon-text">Reports</span>
              </a>
              {this.renderReportsCollapsedMenu()}
            </li>
            {(this.isAuthorizated(getEntityReadPermission(ROLE_ENTITY))
              || this.isAuthorizated(getEntityReadPermission(USER_ENTITY)))
              && (
              <li>
                <a href="" onClick={this.toggleUserManagementCollapsedMenu}>
                  <FontAwesomeIcon icon="user-friends" />
                  <span className="icon-text">User Management</span>
                </a>
                {this.renderUserManagementCollapsedMenu()}
              </li>
              )}
            {this.isAuthorizated(getEntityReadPermission(GROUP_ENTITY))
            && (
              <li>
                <Link to={`/viewEntity/${GROUP_ENTITY}`}>
                  <FontAwesomeIcon icon="layer-group" />
                  <span className="icon-text">Enrollment group</span>
                </Link>
              </li>
            )}
            <li>
              <a href="" onClick={this.toggleSettingsCollapsedMenu}>
                <FontAwesomeIcon icon="cog" />
                <span className="icon-text">Settings</span>
              </a>
              {this.renderSettingsCollapsedMenu()}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  permissions: state.auth.permissions,
});

SideBar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(SideBar);
