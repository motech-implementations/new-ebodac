import { combineReducers } from 'redux';
import entityReducer from './entity-reducer';
import authReducer from './auth-reducer';
import fieldConfigReducer from './field-config-reducer';
import registrationReducer from './registrations-reducer';

const rootReducer = combineReducers({
  entity: entityReducer,
  auth: authReducer,
  fieldConfig: fieldConfigReducer,
  registrationReducer,
});

export default rootReducer;
