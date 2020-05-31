import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import '../../css/main.scss';

import Header from './header';
import SideBar from './sidebar';
import Home from './home';
import VaccineeEnrollment from './enrollment/vaccinee-enrollment';
import VisitEnrollment from './enrollment/visit-enrollment';
import CallLogVaccinees from './reports/call-log-vaccinees';
import RoutePrivate from './helpers/RoutePrivate';
import EntityRoutePrivate from './helpers/EntityRoutePrivate';
import ViewEntity from './entities/view-entity';
import FieldConfigPage from './fields/field-config-page';
import CreateEntityPage from './entities/create-entity-page';
import EditEntityPage from './entities/edit-entity-page';
import UserEdit from './entities/users/user-edit';
import RoleEdit from './entities/roles/role-edit';
import ViewUser from './entities/users/view-user';
import ViewRole from './entities/roles/view-role';
import CsvConfigCreate from './csv/csv-config-create';
import CsvConfigUpdate from './csv/csv-config-update';
import CsvConfigTable from './csv/csv-config-table';
import JsonConfigCreate from './json/json-config-create';
import JsonConfigUpdate from './json/json-config-update';
import JsonConfigTable from './json/json-config-table';
import CsvImport from './entities/csv-import';
import AppSettings from './settings/app-settings';
import CallConfigTable from './ivr-config/call-config-table';
import CallConfigCreate from './ivr-config/call-config-create';
import CallConfigUpdate from './ivr-config/call-config-update';
import IvrProviderConfigTable from './ivr-config/ivr-provider-config-table';
import IvrProviderConfigCreate from './ivr-config/ivr-provider-config-create';
import IvrProviderConfigUpdate from './ivr-config/ivr-provider-config-update';

import {
  MANAGE_FIELD_CONFIG, MANAGE_CSV_CONFIG, MANAGE_APP_SETTINGS, MANAGE_VACCINEE_ENROLLMENT,
  MANAGE_JSON_CONFIG, MANAGE_CALL_CONFIG, MANAGE_IVR_PROVIDER_CONFIG,
} from '../constants/permissions';
import { USER_ENTITY, ROLE_ENTITY, VACCINEE_ENTITY } from '../constants/entity-types';

import { fetchAllFieldConfigs } from '../actions/field-config-actions';
import { fetchAllCsvConfigs } from '../actions/csv-config-actions';
import { getEntityReadPermission } from '../utils/permission-helper';

class AppContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllFieldConfigs();
    this.props.fetchAllCsvConfigs();
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
        <div id="page-wrapper">
          <div className="container-wrapper">
            <div className="container-fluid">
              <Switch>
                <RoutePrivate
                  requiredPermissions={[MANAGE_VACCINEE_ENROLLMENT]}
                  path="/vaccineeEnrollment"
                  component={VaccineeEnrollment}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_VACCINEE_ENROLLMENT]}
                  path="/visitEnrollment/:id"
                  component={VisitEnrollment}
                />
                <RoutePrivate
                  requiredPermissions={[getEntityReadPermission(VACCINEE_ENTITY)]}
                  path="/callLogVaccinees"
                  component={CallLogVaccinees}
                />
                <EntityRoutePrivate readOnly path={`/viewEntity/${ROLE_ENTITY}`} component={ViewRole} />
                <EntityRoutePrivate readOnly path={`/viewEntity/${USER_ENTITY}`} component={ViewUser} />
                <EntityRoutePrivate readOnly path="/viewEntity/:entityType" component={ViewEntity} />
                <EntityRoutePrivate path="/create/:entityType" component={CreateEntityPage} />
                <EntityRoutePrivate path={`/entityEdit/${ROLE_ENTITY}/:id`} component={RoleEdit} />
                <EntityRoutePrivate path={`/entityEdit/${USER_ENTITY}/:id`} component={UserEdit} />
                <EntityRoutePrivate path="/entityEdit/:entityType/:id" component={EditEntityPage} />
                <EntityRoutePrivate path="/import/:entityType/" component={CsvImport} />
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
                  requiredPermissions={[MANAGE_JSON_CONFIG]}
                  path="/jsonConfigTable"
                  component={JsonConfigTable}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_JSON_CONFIG]}
                  path="/createJsonConfig/"
                  component={JsonConfigCreate}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_JSON_CONFIG]}
                  path="/updateJsonConfig/:entity/:id"
                  component={JsonConfigUpdate}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_CALL_CONFIG]}
                  path="/createCallConfig"
                  component={CallConfigCreate}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_CALL_CONFIG]}
                  path="/updateCallConfig/:id"
                  component={CallConfigUpdate}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_CALL_CONFIG]}
                  path="/callConfigTable"
                  component={CallConfigTable}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_IVR_PROVIDER_CONFIG]}
                  path="/createIvrProviderConfig"
                  component={IvrProviderConfigCreate}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_IVR_PROVIDER_CONFIG]}
                  path="/updateIvrProviderConfig/:id"
                  component={IvrProviderConfigUpdate}
                />
                <RoutePrivate
                  requiredPermissions={[MANAGE_IVR_PROVIDER_CONFIG]}
                  path="/ivrProviderConfigTable"
                  component={IvrProviderConfigTable}
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

export default connect(null, {
  fetchAllFieldConfigs, fetchAllCsvConfigs,
})(AppContent);

AppContent.propTypes = {
  fetchAllFieldConfigs: PropTypes.func.isRequired,
  fetchAllCsvConfigs: PropTypes.func.isRequired,
};
