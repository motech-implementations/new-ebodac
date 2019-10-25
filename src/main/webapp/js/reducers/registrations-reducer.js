import { REGISTER_USER } from '../actions/types';

const initialState = {
  registrationMessage: '',
  registrationSuccess: false,
};

export default (state = initialState, action) => {
  if (action.error) {
    return state;
  }
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
