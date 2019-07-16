import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../css/main.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButtonToggled: true,
    };
    this.collapseSideBar = this.collapseSideBar.bind(this);
  }

  collapseSideBar() {
    this.props.toggleSidebarMenu();
    this.setState(prevState => ({ toggleButtonToggled: !prevState.toggleButtonToggled }));
  }

  render() {
    const { toggleButtonToggled } = this.state;
    return (
      <div>
        <div className="topnav">
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
};

export default Header;
