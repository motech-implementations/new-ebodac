import { combineReducers } from 'redux';
import vaccineReducer from './vaccinee-reducer';
import authReducer from './auth-reducer';
import fieldConfigReducer from './field-config-reducer';

const rootReducer = combineReducers({
  vaccinee: vaccineReducer,
  auth: authReducer,
  fieldConfig: fieldConfigReducer,
});

export default rootReducer;
