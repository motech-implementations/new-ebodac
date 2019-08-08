import { combineReducers } from 'redux';
import vaccineReducer from './vaccinee-reducer';
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
  vaccinee: vaccineReducer,
  auth: authReducer,
});

export default rootReducer;
