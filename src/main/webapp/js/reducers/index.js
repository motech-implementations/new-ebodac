import { combineReducers } from 'redux';
import entityReducer from './entity-reducer';
import authReducer from './auth-reducer';
import fieldConfigReducer from './field-config-reducer';
import registrationReducer from './registrations-reducer';
import csvConfigReducer from './csv-config-reducer';

const rootReducer = combineReducers({
  entity: entityReducer,
  auth: authReducer,
  fieldConfig: fieldConfigReducer,
  registrationReducer,
  csvConfig: csvConfigReducer,
});

export default rootReducer;
