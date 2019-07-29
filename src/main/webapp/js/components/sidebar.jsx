import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../../css/main.scss';

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
    this.toggleEnrollmentCollapsedMenu = this.toggleEnrollmentCollapsedMenu.bind(this);
    this.toggleVisitsCollapsedMenu = this.toggleVisitsCollapsedMenu.bind(this);
    this.toggleReportsCollapsedMenu = this.toggleReportsCollapsedMenu.bind(this);
    this.toggleUserManagementCollapsedMenu = this.toggleUserManagementCollapsedMenu.bind(this);
    this.toggleSettingsCollapsedMenu = this.toggleSettingsCollapsedMenu.bind(this);
    this.toggleFieldsCollapsedMenu = this.toggleFieldsCollapsedMenu.bind(this);
  }

  toggleEnrollmentCollapsedMenu(event) {
    event.preventDefault();
    this.setState(prevState => ({ enrollmentCollapsed: !prevState.enrollmentCollapsed }));
    return false;
  }

  renderEnrollmentCollapsedMenu() {
    if (this.state.enrollmentCollapsed) {
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
  }

  toggleVisitsCollapsedMenu(event) {
    event.preventDefault();
    this.setState(prevState => ({ visitsCollapsed: !prevState.visitsCollapsed }));
    return false;
  }

  renderVisitsCollapsedMenu() {
    if (this.state.visitsCollapsed) {
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
  }

  toggleReportsCollapsedMenu(event) {
    event.preventDefault();
    this.setState(prevState => ({ reportsCollapsed: !prevState.reportsCollapsed }));
    return false;
  }

  renderReportsCollapsedMenu() {
    if (this.state.reportsCollapsed) {
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
  }

  toggleUserManagementCollapsedMenu(event) {
    event.preventDefault();
    this.setState(prevState => ({ userManagmentCollapsed: !prevState.userManagmentCollapsed }));
    return false;
  }

  renderUserManagementCollapsedMenu() {
    if (this.state.userManagmentCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-second-level">
        <li className="border-none">
          <Link to="/roles">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Roles</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/users">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Users</span>
          </Link>
        </li>
      </ul>
    );
  }

  toggleSettingsCollapsedMenu(event) {
    event.preventDefault();
    this.setState(prevState => ({ settingsCollapsed: !prevState.settingsCollapsed }));
    return false;
  }

  renderSettingsCollapsedMenu() {
    if (this.state.settingsCollapsed) {
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
          <Link to="/languages">
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
          <Link to="/sites">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Sites</span>
          </Link>
        </li>
      </ul>
    );
  }

  toggleFieldsCollapsedMenu(event) {
    event.preventDefault();
    this.setState(prevState => ({ fieldsCollapsed: !prevState.fieldsCollapsed }));
    return false;
  }

  renderFieldsCollapsedMenu() {
    if (this.state.fieldsCollapsed) {
      return '';
    }

    return (
      <ul className="nav nav-third-level">
        <li className="border-none">
          <Link to="/vaccineeFields">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Vaccinee</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/keyCommunityPersonFields">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Key Community Persons</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/sitesFields">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Sites</span>
          </Link>
        </li>
        <li className="border-none">
          <Link to="/visitScheduleFields">
            <FontAwesomeIcon icon="hand-point-right" />
            <span className="icon-text">Visit Schedule</span>
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className={`sidebar-collapse ${this.props.sidebarVisible ? 'collapse' : ''}`}>
        <div>
          <ul className="nav navbar-nav side-nav">
            <li>
              <Link to="/vaccinee">
                <FontAwesomeIcon icon="syringe" />
                <span className="icon-text">Vaccinees</span>
              </Link>
            </li>
            <li>
              <Link to="/keyCommunityPerson">
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
                <span className="icon-text">User Managment</span>
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
