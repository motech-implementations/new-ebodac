import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import '../../css/main.scss';

import Header from './header';
import SideBar from './sidebar';
import Home from './home';
import KeyCommunityPersonEnrollment from './enrollment/key-community-person-enrollment';
import VaccineeEnrollment from './enrollment/vaccinee-enrollment';
import VisitSchedule from './visit/visit-schedule';
import BoosterVisitGenerator from './visit/booster-visit-generator';
import UserLogs from './reports/user-logs';
import PrimeVaccination from './reports/prime-vaccination';
import ClinicVisit from './reports/clinic-visit';
import CallLogVaccinees from './reports/call-log-vaccinees';
import CallLogCommunityPerson from './reports/call-log-community-person';
import SmsLogVaccinees from './reports/sms-log-vaccinees';
import SmsLogCommunityPerson from './reports/sms-log-community-person';
import Messaging from './settings/messaging';
import Languages from './settings/languages';
import RoutePrivate from './helpers/RoutePrivate';
import EntityRoutePrivate from './helpers/EntityRoutePrivate';
import ViewEntity from './entities/view-entity';
import FieldConfigPage from './fields/field-config-page';
import CreateOrEditEntityPage from './entities/create-edit-entity-page';
import {
  MANAGE_FIELD_CONFIG,
  MANAGE_CSV_CONFIG,
  MANAGE_APP_SETTINGS,
} from '../constants/permissions';
import CsvConfigCreate from './csv/csv-config-create';
import CsvConfigUpdate from './csv/csv-config-update';
import CsvConfigTable from './csv/csv-config-table';
import AppSettings from './settings/app-settings';

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
                <RoutePrivate path="/boosterVisitGenerator" component={BoosterVisitGenerator} />
                <RoutePrivate path="/userLogs" component={UserLogs} />
                <RoutePrivate path="/primeVaccination" component={PrimeVaccination} />
                <RoutePrivate path="/clinicVisit" component={ClinicVisit} />
                <RoutePrivate path="/callLogVaccinees" component={CallLogVaccinees} />
                <RoutePrivate path="/callLogCommunityPerson" component={CallLogCommunityPerson} />
                <RoutePrivate path="/smsLogVaccinees" component={SmsLogVaccinees} />
                <RoutePrivate path="/smsLogCommunityPerson" component={SmsLogCommunityPerson} />
                <RoutePrivate path="/messaging" component={Messaging} />
                <RoutePrivate path="/languages" component={Languages} />
                <EntityRoutePrivate readOnly path="/viewEntity/:entityType" component={ViewEntity} />
                <EntityRoutePrivate path="/create/:entityType" component={CreateOrEditEntityPage} />
                <EntityRoutePrivate path="/entityEdit/:entityType/:id" component={CreateOrEditEntityPage} />
                <RoutePrivate
                  requiredPermissions={[MANAGE_FIELD_CONFIG]}
                  path="/fieldConfig/:entityType"
                  component={FieldConfigPage}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_CSV_CONFIG]}
                  path="/createCsvConfig/"
                  component={CsvConfigCreate}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_CSV_CONFIG]}
                  path="/updateCsvConfig/:entity/:id"
                  component={CsvConfigUpdate}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_CSV_CONFIG]}
                  path="/csvConfigTable"
                  component={CsvConfigTable}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_APP_SETTINGS]}
                  path="/appSettings"
                  component={AppSettings}
                />
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
