import React, { Component } from 'react';

import '../../css/main.scss';

import Header from './header';
import SideBar from './sidebar';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      sidebarVisible: false,
    };
    this.collapseSideBar = this.collapseSideBar.bind(this);
  }

  collapseSideBar() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  }

  render() {
    const { sidebarVisible } = this.state;
    return (
      <div>
        <Header toggleSidebarMenu={this.collapseSideBar} className="navbar navbar-inverse navbar-fixed-top" />
        <SideBar className={this.state.showMenuSmart ? 'hide-max-r-xsmall-max' : ''} sidebarVisible={sidebarVisible} />
        <div id="wrapper">
          <div id="page-wrapper">
            <div className="container-wrapper">
              <div className="container-fluid">
                <h1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
