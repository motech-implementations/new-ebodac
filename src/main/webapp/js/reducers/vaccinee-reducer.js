import { FETCH_VACCINEES } from '../actions/types';

const initialState = {
  vaccineeList: [],
};

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
