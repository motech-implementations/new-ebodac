import { combineReducers } from 'redux';
import vaccineReducer from './vaccinee-reducer';

const rootReducer = combineReducers({
  vaccineReducer,
});

export default rootReducer;
