import { combineReducers } from 'redux';
import vaccineReducer from './vaccinee-reducer';
import authReducer from './auth-reducer';
import configReducer from './config-reducer';

const rootReducer = combineReducers({
  vaccinee: vaccineReducer,
  auth: authReducer,
  fieldConfigs: configReducer,
});

export default rootReducer;
