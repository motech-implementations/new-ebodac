import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import '../../css/main.scss';

import Header from './header';
import SideBar from './sidebar';
import Home from './home';
import Vaccinee from './vaccinee';
import KeyCommunityPerson from './key-community-person';
import KeyCommunityPersonEnrollment from './enrollment/key-community-person-enrollment';
import VaccineeEnrollment from './enrollment/vaccinee-enrollment';
import VisitSchedule from './visit/visit-schedule';
import VisitTypes from './visit/visit-types';
import BoosterVisitGenerator from './visit/booster-visit-generator';
import UserLogs from './reports/user-logs';
import PrimeVaccination from './reports/prime-vaccination';
import ClinicVisit from './reports/clinic-visit';
import CallLogVaccinees from './reports/call-log-vaccinees';
import CallLogCommunityPerson from './reports/call-log-community-person';
import SmsLogVaccinees from './reports/sms-log-vaccinees';
import SmsLogCommunityPerson from './reports/sms-log-community-person';
import Roles from './user-managment/roles';
import Users from './user-managment/users';
import Enrollment from './enrollment';
import Messaging from './settings/messaging';
import Languages from './settings/languages';
import Sites from './settings/sites';
import KeyCommunityPersonFields from './fields/key-community-person-fields';
import SiteFields from './fields/site-fields';
import VaccineeFields from './fields/vaccinee-fields';
import VisitScheduleFields from './fields/visit-schedule-fields';
import RoutePrivate from './helpers/RoutePrivate';
import MessageCampaign from './message-campaign';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false,
    };
    this.collapseSideBar = this.collapseSideBar.bind(this);
  }

  collapseSideBar() {
    this.setState(prevState => ({ sidebarVisible: !prevState.sidebarVisible }));
  }

  render() {
    const { sidebarVisible } = this.state;
    return (
      <Router>
        <div>
          <Header toggleSidebarMenu={this.collapseSideBar} className="navbar navbar-inverse navbar-fixed-top" />
          <SideBar sidebarVisible={sidebarVisible} />
          <div id="wrapper">
            <div id="page-wrapper">
              <div className="container-wrapper">
                <Route exact path="/" component={Home} />
                <RoutePrivate path="/vaccinee" component={Vaccinee} />
                <RoutePrivate path="/keyCommunityPerson" component={KeyCommunityPerson} />
                <RoutePrivate path="/keyCommunityPersonEnrollment" component={KeyCommunityPersonEnrollment} />
                <RoutePrivate path="/vaccineeEnrollment" component={VaccineeEnrollment} />
                <RoutePrivate path="/visitSchedule" component={VisitSchedule} />
                <RoutePrivate path="/visitTypes" component={VisitTypes} />
                <RoutePrivate path="/boosterVisitGenerator" component={BoosterVisitGenerator} />
                <RoutePrivate path="/userLogs" component={UserLogs} />
                <RoutePrivate path="/primeVaccination" component={PrimeVaccination} />
                <RoutePrivate path="/clinicVisit" component={ClinicVisit} />
                <RoutePrivate path="/callLogVaccinees" component={CallLogVaccinees} />
                <RoutePrivate path="/callLogCommunityPerson" component={CallLogCommunityPerson} />
                <RoutePrivate path="/smsLogVaccinees" component={SmsLogVaccinees} />
                <RoutePrivate path="/smsLogCommunityPerson" component={SmsLogCommunityPerson} />
                <RoutePrivate path="/roles" component={Roles} />
                <RoutePrivate path="/users" component={Users} />
                <RoutePrivate path="/enrollmentGroup" component={Enrollment} />
                <RoutePrivate path="/messaging" component={Messaging} />
                <RoutePrivate path="/languages" component={Languages} />
                <RoutePrivate path="/sites" component={Sites} />
                <RoutePrivate path="/vaccineeFields" component={VaccineeFields} />
                <RoutePrivate path="/keyCommunityPersonFields" component={KeyCommunityPersonFields} />
                <RoutePrivate path="/sitesFields" component={SiteFields} />
                <RoutePrivate path="/visitScheduleFields" component={VisitScheduleFields} />
                <RoutePrivate path="/messageCampaign" component={MessageCampaign} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Navbar;
