import { combineReducers } from 'redux';
import entityReducer from './entity-reducer';
import authReducer from './auth-reducer';
import fieldConfigReducer from './field-config-reducer';
import registrationReducer from './registrations-reducer';
import csvConfigReducer from './csv-config-reducer';
import appSettingsReducer from './app-settings-reducer';
import jsonConfigReducer from './json-config-reducer';
import callConfigReducer from './call-config-reducer';
import ivrProviderConfigReducer from './ivr-provider-config-reducer';

const rootReducer = combineReducers({
  entity: entityReducer,
  auth: authReducer,
  fieldConfig: fieldConfigReducer,
  registrationReducer,
  csvConfig: csvConfigReducer,
  jsonConfig: jsonConfigReducer,
  appSettings: appSettingsReducer,
  callConfig: callConfigReducer,
  ivrProviderConfig: ivrProviderConfigReducer,
});

export default rootReducer;
