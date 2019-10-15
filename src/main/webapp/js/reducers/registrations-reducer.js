import { REGISTER_USER } from '../actions/types';

const initialState = {
  registrationMessage: '',
  registrationSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registrationMessage: action.payload.message,
        registrationSuccess: action.payload.success,
      };
    default:
  }

  return state;
};
