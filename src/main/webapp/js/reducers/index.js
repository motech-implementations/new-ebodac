import { combineReducers } from 'redux';
import vaccineReducer from './vaccinee-reducer';

const rootReducer = combineReducers({
  vaccinee: vaccineReducer,
});

export default rootReducer;
