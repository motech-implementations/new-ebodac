import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { resetLogoutCounter } from '../actions/auth-actions';

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
import {
  MANAGE_FIELD_CONFIG,
  MANAGE_CSV_CONFIG,
  MANAGE_APP_SETTINGS,
  MANAGE_VACCINEE_ENROLLMENT,
  MANAGE_JSON_CONFIG,
  MANAGE_CALL_CONFIG,
  MANAGE_IVR_PROVIDER_CONFIG,
} from '../constants/permissions';
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

  renderLink = (to, icon, text) => (
    <Link to={to} onClick={() => this.props.resetLogoutCounter()}>
      <FontAwesomeIcon icon={icon} />
      <span className="icon-text">{text}</span>
    </Link>
  );

  renderEnrollmentCollapsedMenu = () => {
    const { enrollmentCollapsed } = this.state;

    if (enrollmentCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-second-level">
        <li className="border-none">
          {this.renderLink('/keyCommunityPersonEnrollment', 'hand-point-right', 'Key Community Person Enrollment')}
        </li>
        {this.isAuthorizated([MANAGE_VACCINEE_ENROLLMENT])
        && (
          <li className="border-none">
            {this.renderLink('/vaccineeEnrollment', 'hand-point-right', 'Vaccinee Enrollment')}
          </li>
        )}
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
            {this.renderLink(`/viewEntity/${VISIT_ENTITY}`, 'hand-point-right', 'Visits')}
          </li>
        )}
        {this.isAuthorizated(getEntityReadPermission(VISIT_TYPE_ENTITY))
        && (
          <li className="border-none">
            {this.renderLink(`/viewEntity/${VISIT_TYPE_ENTITY}`, 'hand-point-right', 'Visit Types')}
          </li>
        )}
        <li className="border-none">
          {this.renderLink('/boosterVisitGenerator', 'hand-point-right', 'Booster Visit Generator')}
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
          {this.renderLink('/userLogs', 'hand-point-right', 'User Logs')}
        </li>
        <li className="border-none">
          {this.renderLink('/primeVaccination', 'hand-point-right', 'Prime Vaccination')}
        </li>
        <li className="border-none">
          {this.renderLink('/clinicVisit', 'hand-point-right', 'Clinic Visit')}
        </li>
        <li className="border-none">
          {this.renderLink('/callLogVaccinees', 'hand-point-right', 'Call Log - Vaccines')}
        </li>
        <li className="border-none">
          {this.renderLink('/callLogCommunityPerson', 'hand-point-right', 'Call Log - Community Person')}
        </li>
        <li className="border-none">
          {this.renderLink('/smsLogVaccinees', 'hand-point-right', 'SMS Log - Vacciness')}
        </li>
        <li className="border-none">
          {this.renderLink('/smsLogCommunityPerson', 'hand-point-right', 'SMS Log - Community Person')}
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
            {this.renderLink(`/viewEntity/${ROLE_ENTITY}`, 'hand-point-right', 'Roles')}
          </li>
        )}
        {this.isAuthorizated(getEntityReadPermission(USER_ENTITY))
        && (
          <li className="border-none">
            {this.renderLink(`/viewEntity/${USER_ENTITY}`, 'hand-point-right', 'Users')}
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
        {this.isAuthorizated(getEntityReadPermission(LANGUAGE_ENTITY))
        && (
          <li className="border-none">
            {this.renderLink(`/viewEntity/${LANGUAGE_ENTITY}`, 'hand-point-right', 'Languages')}
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
            {this.renderLink(`/viewEntity/${SITE_ENTITY}`, 'hand-point-right', 'Sites')}
          </li>
        )}
        {this.isAuthorizated([MANAGE_CSV_CONFIG])
        && (
          <li className="border-none">
            {this.renderLink('/csvConfigTable', 'hand-point-right', 'CSV Import Config')}
          </li>
        )}
        {this.isAuthorizated([MANAGE_JSON_CONFIG])
        && (
          <li className="border-none">
            <Link to="/jsonConfigTable">
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Json Import Config</span>
            </Link>
          </li>
        )}
        {this.isAuthorizated([MANAGE_IVR_PROVIDER_CONFIG])
        && (
          <li className="border-none">
            <Link to="/ivrProviderConfigTable">
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">IVR Provider Config</span>
            </Link>
          </li>
        )}
        {this.isAuthorizated([MANAGE_CALL_CONFIG])
        && (
          <li className="border-none">
            <Link to="/callConfigTable">
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">IVR Call Config</span>
            </Link>
          </li>
        )}
        {this.isAuthorizated([MANAGE_APP_SETTINGS])
        && (
          <li className="border-none">
            {this.renderLink('/appSettings', 'hand-point-right', 'App Settings')}
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
            {this.renderLink(`/fieldConfig/${VACCINEE_ENTITY}`, 'hand-point-right', 'Vaccinee')}
          </div>
        </li>
        <li className="border-none">
          <div className="third-level-item">
            {this.renderLink(`/fieldConfig/${KEY_COMMUNITY_PERSON_ENTITY}`, 'hand-point-right', 'Key Community Persons')}
          </div>
        </li>
        <li className="border-none">
          <div className="third-level-item">
            {this.renderLink(`/fieldConfig/${SITE_ENTITY}`, 'hand-point-right', 'Sites')}
          </div>
        </li>
        <li className="border-none">
          <div className="third-level-item">
            {this.renderLink(`/fieldConfig/${VISIT_ENTITY}`, 'hand-point-right', 'Visit Schedule')}
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
                {this.renderLink(`/viewEntity/${VACCINEE_ENTITY}`, 'syringe', 'Vaccinees')}
              </li>
            )}
            {this.isAuthorizated(getEntityReadPermission(KEY_COMMUNITY_PERSON_ENTITY))
            && (
              <li>
                {this.renderLink(`/viewEntity/${KEY_COMMUNITY_PERSON_ENTITY}`, 'key', 'Key Community Persons')}
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
                {this.renderLink(`/viewEntity/${CAMPAIGN_MESSAGE_ENTITY}`, 'envelope', 'Message Campaigns')}
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
                {this.renderLink(`/viewEntity/${GROUP_ENTITY}`, 'layer-group', 'Enrollment group')}
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
  resetLogoutCounter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { resetLogoutCounter })(SideBar);
