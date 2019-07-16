import React, { Component } from 'react';
import Header from './header';
import SideBar from './sidebar';
import '../../css/main.scss';

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
        <Header toggleSidebarMenu={this.collapseSideBar} />
        <div id="wrapper">
          <div id="page-wrapper" className={this.state.showMenuSmart ? 'hide-max-r-xsmall-max' : ''}>
            <SideBar sidebarVisible={sidebarVisible} />
            <div className="container-wrapper">
              <div className="container-fluid">
                <div>
                  <h1>
                    Content
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Navbar;
