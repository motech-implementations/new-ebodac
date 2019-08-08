import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../css/main.scss';
import { signoutUser } from '../actions';
import CounterLogout from './counter-logout';

/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButtonToggled: true,
    };
    this.collapseSideBar = this.collapseSideBar.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  onSignout(event) {
    this.props.signoutUser();
    event.preventDefault();
  }

  collapseSideBar() {
    const { toggleSidebarMenu } = this.props;

    toggleSidebarMenu();
    this.setState(prevState => ({ toggleButtonToggled: !prevState.toggleButtonToggled }));
  }

  render() {
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
          <a className="active" href="#home">Home</a>
          <a href="#news">New ebodac</a>
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  toggleSidebarMenu: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
};

export default connect(null, { signoutUser })(Header);
