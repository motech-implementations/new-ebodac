import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    };
    this.toggleEnrollmentCollapsedMenu = this.toggleEnrollmentCollapsedMenu.bind(this);
    this.toggleVisitsCollapsedMenu = this.toggleVisitsCollapsedMenu.bind(this);
    this.toggleReportsCollapsedMenu = this.toggleReportsCollapsedMenu.bind(this);
    this.toggleUserManagementCollapsedMenu = this.toggleUserManagementCollapsedMenu.bind(this);
    this.toggleSettingsCollapsedMenu = this.toggleSettingsCollapsedMenu.bind(this);
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
      <div>
        asdas
      </div>
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
      <div>
        renderVisitsCollapsedMenu
      </div>
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
      <div>
        renderReportsCollapsedMenu
      </div>
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
      <div>
        renderUserManagmentCollapsedMenu
      </div>
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
      <div>
        settingsCollapsed
      </div>
    );
  }

  render() {
    return (
      <div className={`navbar-collapse ${this.props.sidebarVisible ? 'collapse' : ''}`}>
        <div className="sidebar-collapse">
          <ul className="nav navbar-nav side-nav">
            <li>
              <a href="">
                <span className="fa fa-users" />
                <span className="icon-text">Vaccinees</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="fa fa-users" />
                <span className="icon-text">Key Community Persons</span>
              </a>
            </li>
            <li>
              <a href="" onClick={this.toggleEnrollmentCollapsedMenu}>
                <span className="fa fa-users" />
                <span className="icon-text">Enrollment</span>
              </a>
              {this.renderEnrollmentCollapsedMenu()}
            </li>
            <li>
              <a href="" onClick={this.toggleVisitsCollapsedMenu}>
                <span className="fa fa-users" />
                <span className="icon-text">Visits</span>
              </a>
              {this.renderVisitsCollapsedMenu()}
            </li>
            <li>
              <a href="" onClick={this.toggleReportsCollapsedMenu}>
                <span className="fa fa-users" />
                <span className="icon-text">Reports</span>
              </a>
              {this.renderReportsCollapsedMenu()}
            </li>
            <li>
              <a href="" onClick={this.toggleUserManagementCollapsedMenu}>
                <span className="fa fa-users" />
                <span className="icon-text">User Managment</span>
              </a>
              {this.renderUserManagementCollapsedMenu()}
            </li>
            <li>
              <a href="">
                <span className="fa fa-users" />
                <span className="icon-text">Enrollment Group</span>
              </a>
            </li>
            <li>
              <a href="" onClick={this.toggleSettingsCollapsedMenu}>
                <span className="fa fa-users" />
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
