import { combineReducers } from 'redux';
import entityReducer from './entity-reducer';
import authReducer from './auth-reducer';
import fieldConfigReducer from './field-config-reducer';

const rootReducer = combineReducers({
  entity: entityReducer,
  auth: authReducer,
  fieldConfig: fieldConfigReducer,
});

export default rootReducer;
