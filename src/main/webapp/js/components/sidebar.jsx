import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../css/main.scss';

import {
  KEY_COMMUNITY_PERSON_ENTITY,
  SITE_ENTITY,
  VACCINEE_ENTITY,
  LANGUAGE_ENTITY,
  VISIT_ENTITY,
  ROLE_ENTITY,
  USER_ENTITY,
} from '../constants/entity-types';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrollmentCollapsed: true,
      visitsCollapsed: true,
      reportsCollapsed: true,
      userManagmentCollapsed: true,
      settingsCollapsed: true,
      fieldsCollapsed: true,
    };
  }

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
    this.setState(prevState => ({ userManagmentCollapsed: !prevState.userManagmentCollapsed }));
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
        <li className="border-none">
          <Link to="/visitSchedule">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Visit Schedule</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/visitTypes">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Visit Types</span>
          </Link>
        </li>
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
    const { userManagmentCollapsed } = this.state;

    if (userManagmentCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-second-level">
        <li className="border-none">
          <Link to={`/viewEntity/${ROLE_ENTITY}`}>
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Roles</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to={`/viewEntity/${USER_ENTITY}`}>
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Users</span>
          </Link>
        </li>
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
        <li className="border-none">
          <Link to={`/viewEntity/${LANGUAGE_ENTITY}`}>
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Languages</span>
          </Link>
        </li>
        <li>
          <a href="" onClick={this.toggleFieldsCollapsedMenu}>
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Fields</span>
          </a>
          {this.renderFieldsCollapsedMenu()}
        </li>
        <li className="border-none">
          <Link to={`/viewEntity/${SITE_ENTITY}`}>
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Sites</span>
          </Link>
        </li>
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
            <li>
              <Link to={`/viewEntity/${VACCINEE_ENTITY}`}>
                <FontAwesomeIcon icon="syringe" />
                <span className="icon-text">Vaccinees</span>
              </Link>
            </li>
            <li>
              <Link to={`/viewEntity/${KEY_COMMUNITY_PERSON_ENTITY}`}>
                <FontAwesomeIcon icon="key" />
                <span className="icon-text">Key Community Persons</span>
              </Link>
            </li>
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
            <li>
              <Link to="/messageCampaign">
                <FontAwesomeIcon icon="envelope" />
                <span className="icon-text">Message Campaigns</span>
              </Link>
            </li>
            <li>
              <a href="" onClick={this.toggleReportsCollapsedMenu}>
                <FontAwesomeIcon icon="file" />
                <span className="icon-text">Reports</span>
              </a>
              {this.renderReportsCollapsedMenu()}
            </li>
            <li>
              <a href="" onClick={this.toggleUserManagementCollapsedMenu}>
                <FontAwesomeIcon icon="user-friends" />
                <span className="icon-text">User Management</span>
              </a>
              {this.renderUserManagementCollapsedMenu()}
            </li>
            <li>
              <Link to="/enrollmentGroup">
                <FontAwesomeIcon icon="layer-group" />
                <span className="icon-text">Enrollment group</span>
              </Link>
            </li>
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
SideBar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired,
};

export default SideBar;
