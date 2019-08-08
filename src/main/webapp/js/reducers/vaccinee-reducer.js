import initialState from './initial-state';
import { FETCH_VACCINEES } from '../actions/types';

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VACCINEES:
      return {
        ...state,
        vaccineeList: action.payload.data,
      };
    default:
      return state;
  }
};
