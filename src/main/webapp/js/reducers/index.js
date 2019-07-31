import { combineReducers } from 'redux';
import vaccineReducer from './vaccinee-reducer';

const rootReducer = combineReducers({
  vaccineReducer: vaccineReducer
});

export default rootReducer;