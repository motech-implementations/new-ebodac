import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../css/main.scss';
import { signoutUser, resetLogoutCounter } from '../actions/auth-actions';
import CounterLogout from './counter-logout';

/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButtonToggled: true,
    };
  }

  onSignout = (event) => {
    this.props.signoutUser();
    event.preventDefault();
  };

  collapseSideBar = () => {
    const { toggleSidebarMenu } = this.props;

    toggleSidebarMenu();
    this.setState(prevState => ({ toggleButtonToggled: !prevState.toggleButtonToggled }));
  };

  render() {
    const { isOnline } = this.props;
    const { toggleButtonToggled } = this.state;
    return (
      <div>
        <div className="topnav">
          <div className="d-flex float-right">
            <CounterLogout />
            <div>
              <a href="" onClick={() => this.onSignout()}>
                <FontAwesomeIcon icon="sign-out-alt" />
                <span className="icon-text"> Logout </span>
              </a>
            </div>
          </div>
          <div
            style={{ verticalAlign: 'text-top' }}
            className={toggleButtonToggled ? 'menu-button change' : 'menu-button'}
            onClick={() => this.collapseSideBar()}
          >
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
          </div>
          <a className="active" href="#home" onClick={() => this.props.resetLogoutCounter()}>Home</a>
          <a href="#news" onClick={() => this.props.resetLogoutCounter()}>New ebodac</a>
          <div className="float-right">
            <div className="online-indicator">
              <span className="online-icon-text">{`${isOnline ? 'ONLINE' : 'OFFLINE'}`}</span>
              <FontAwesomeIcon className={`${isOnline ? '' : 'offline-icon'}`} icon="wifi" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isOnline: state.offline.online,
});

export default connect(mapStateToProps, { signoutUser, resetLogoutCounter })(Header);

Header.propTypes = {
  toggleSidebarMenu: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
  resetLogoutCounter: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
};
