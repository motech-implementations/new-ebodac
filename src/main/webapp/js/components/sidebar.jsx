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

  hasPermission = (requiredPermission) => {
    const { permissions } = this.props;

    return _.includes(permissions, requiredPermission);
  };

  hasAnyPermission = (requiredPermissions) => {
    const { permissions } = this.props;

    if (_.isEmpty(requiredPermissions)) {
      return true;
    }

    return _.some(requiredPermissions, permission => _.includes(permissions, permission));
  };

  hasReadPermission = entityType => this.hasPermission(getEntityReadPermission(entityType));

  hasAnyReadPermission = (entityTypes) => {
    const permissions = _.map(entityTypes, entityType => getEntityReadPermission(entityType));

    return this.hasAnyPermission(permissions);
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
        {this.hasPermission(MANAGE_VACCINEE_ENROLLMENT)
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
        {this.hasReadPermission(VISIT_ENTITY)
        && (
          <li className="border-none">
            {this.renderLink(`/viewEntity/${VISIT_ENTITY}`, 'hand-point-right', 'Visits')}
          </li>
        )}
        {this.hasReadPermission(VISIT_TYPE_ENTITY)
        && (
          <li className="border-none">
            {this.renderLink(`/viewEntity/${VISIT_TYPE_ENTITY}`, 'hand-point-right', 'Visit Types')}
          </li>
        )}
        {this.hasReadPermission(SITE_ENTITY)
        && (
          <li className="border-none">
            {this.renderLink(`/viewEntity/${SITE_ENTITY}`, 'hand-point-right', 'Sites')}
          </li>
        )}
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
          {this.renderLink('/callLogVaccinees', 'hand-point-right', 'Vaccinee Call Status')}
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
        {this.hasReadPermission(ROLE_ENTITY)
        && (
          <li className="border-none">
            {this.renderLink(`/viewEntity/${ROLE_ENTITY}`, 'hand-point-right', 'Roles')}
          </li>
        )}
        {this.hasReadPermission(USER_ENTITY)
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
        {this.hasPermission(MANAGE_APP_SETTINGS)
        && (
          <li className="border-none">
            {this.renderLink('/appSettings', 'hand-point-right', 'App Settings')}
          </li>
        )}
        {this.hasPermission(MANAGE_FIELD_CONFIG)
        && (
          <li>
            <a href="" onClick={this.toggleFieldsCollapsedMenu}>
              <FontAwesomeIcon icon="hand-point-right" />
              <span className="icon-text">Fields</span>
            </a>
            {this.renderFieldsCollapsedMenu()}
          </li>
        )}
        {this.hasPermission(MANAGE_CSV_CONFIG)
        && (
          <li className="border-none">
            {this.renderLink('/csvConfigTable', 'hand-point-right', 'CSV Import Config')}
          </li>
        )}
        {this.hasPermission(MANAGE_JSON_CONFIG)
        && (
          <li className="border-none">
            {this.renderLink('/jsonConfigTable', 'hand-point-right', 'Json Import Config')}
          </li>
        )}
        {this.hasPermission(MANAGE_IVR_PROVIDER_CONFIG)
        && (
          <li className="border-none">
            {this.renderLink('/ivrProviderConfigTable', 'hand-point-right', 'IVR Provider Config')}
          </li>
        )}
        {this.hasPermission(MANAGE_CALL_CONFIG)
        && (
          <li className="border-none">
            {this.renderLink('/callConfigTable', 'hand-point-right', 'IVR Call Config')}
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
            {this.renderLink(`/fieldConfig/${VISIT_ENTITY}`, 'hand-point-right', 'Visit')}
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
      </ul>
    );
  };

  render() {
    const { sidebarVisible } = this.props;

    return (
      <div className={`sidebar-collapse ${sidebarVisible ? 'collapse' : ''}`}>
        <div>
          <ul className="nav navbar-nav side-nav">
            {this.hasReadPermission(VACCINEE_ENTITY)
            && (
              <li>
                {this.renderLink(`/viewEntity/${VACCINEE_ENTITY}`, 'syringe', 'Vaccinees')}
              </li>
            )}
            {(this.hasAnyReadPermission([VISIT_ENTITY, VISIT_TYPE_ENTITY, SITE_ENTITY]))
            && (
              <li>
                <a href="" onClick={this.toggleVisitsCollapsedMenu}>
                  <FontAwesomeIcon icon="glasses" />
                  <span className="icon-text">Visits</span>
                </a>
                {this.renderVisitsCollapsedMenu()}
              </li>
            )}
            {this.hasReadPermission(KEY_COMMUNITY_PERSON_ENTITY)
            && (
              <li>
                {this.renderLink(`/viewEntity/${KEY_COMMUNITY_PERSON_ENTITY}`, 'key', 'Key Community Persons')}
              </li>
            )}
            {this.hasPermission(MANAGE_VACCINEE_ENROLLMENT)
            && (
              <li>
                <a href="" onClick={this.toggleEnrollmentCollapsedMenu}>
                  <FontAwesomeIcon icon="user-plus" />
                  <span className="icon-text">Enrollment</span>
                </a>
                {this.renderEnrollmentCollapsedMenu()}
              </li>
            )}
            {this.hasReadPermission(CAMPAIGN_MESSAGE_ENTITY)
            && (
              <li>
                {this.renderLink(`/viewEntity/${CAMPAIGN_MESSAGE_ENTITY}`, 'envelope', 'Message Campaigns')}
              </li>
            )}
            {(this.hasReadPermission(VACCINEE_ENTITY))
            && (
              <li>
                <a href="" onClick={this.toggleReportsCollapsedMenu}>
                  <FontAwesomeIcon icon="file" />
                  <span className="icon-text">Reports</span>
                </a>
                {this.renderReportsCollapsedMenu()}
              </li>
            )}
            {(this.hasAnyReadPermission([ROLE_ENTITY, USER_ENTITY]))
            && (
              <li>
                <a href="" onClick={this.toggleUserManagementCollapsedMenu}>
                  <FontAwesomeIcon icon="user-friends" />
                  <span className="icon-text">User Management</span>
                </a>
                {this.renderUserManagementCollapsedMenu()}
              </li>
            )}
            {this.hasReadPermission(GROUP_ENTITY)
            && (
              <li>
                {this.renderLink(`/viewEntity/${GROUP_ENTITY}`, 'layer-group', 'Enrollment group')}
              </li>
            )}
            {this.hasReadPermission(LANGUAGE_ENTITY)
            && (
              <li>
                {this.renderLink(`/viewEntity/${LANGUAGE_ENTITY}`, 'hand-point-right', 'Languages')}
              </li>
            )}
            {this.hasAnyPermission([MANAGE_APP_SETTINGS, MANAGE_FIELD_CONFIG, MANAGE_CSV_CONFIG,
              MANAGE_JSON_CONFIG, MANAGE_IVR_PROVIDER_CONFIG, MANAGE_CALL_CONFIG])
            && (
              <li>
                <a href="" onClick={this.toggleSettingsCollapsedMenu}>
                  <FontAwesomeIcon icon="cog" />
                  <span className="icon-text">Settings</span>
                </a>
                {this.renderSettingsCollapsedMenu()}
              </li>
            )}
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
