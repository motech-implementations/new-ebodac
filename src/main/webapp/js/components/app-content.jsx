import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import '../../css/main.scss';

import Header from './header';
import SideBar from './sidebar';
import Home from './home';
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
import Enrollment from './enrollment';
import Messaging from './settings/messaging';
import Languages from './settings/languages';
import RoutePrivate from './helpers/RoutePrivate';
import MessageCampaign from './message-campaign';
import ViewEntity from './entities/view-entity';
import EditEntityPage from './entities/edit-entity-page';
import FieldConfigPage from './fields/field-config-page';

class AppContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false,
    };
  }

  collapseSideBar = () => {
    this.setState(prevState => ({ sidebarVisible: !prevState.sidebarVisible }));
  };

  render() {
    const { sidebarVisible } = this.state;
    return (
      <div>
        <Header toggleSidebarMenu={this.collapseSideBar} className="navbar navbar-inverse navbar-fixed-top" />
        <SideBar sidebarVisible={sidebarVisible} />
        <div id="wrapper">
          <div id="page-wrapper">
            <div className="container-wrapper">
              <Switch>
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
                <RoutePrivate path="/enrollmentGroup" component={Enrollment} />
                <RoutePrivate path="/messaging" component={Messaging} />
                <RoutePrivate path="/languages" component={Languages} />
                <RoutePrivate path="/messageCampaign" component={MessageCampaign} />
                <RoutePrivate path="/viewEntity/:entityType" component={ViewEntity} />
                <RoutePrivate path="/entityEdit/:entityType/:id" component={EditEntityPage} />
                <RoutePrivate path="/entityEdit/:entityType" component={EditEntityPage} />
                <RoutePrivate path="/fieldConfig/:entityType" component={FieldConfigPage} />
                <RoutePrivate path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppContent;
