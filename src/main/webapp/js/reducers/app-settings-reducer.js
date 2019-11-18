import update from 'immutability-helper';

import { FETCH_APP_SETTINGS, UPDATE_APP_SETTINGS } from '../actions/types';

const initialState = {
  appSettings: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  if (action.error) {
    return state;
  }
  switch (type) {
    case FETCH_APP_SETTINGS:
      return update(state, {
        appSettings: {
          $set: payload.data,
        },
      });
    case UPDATE_APP_SETTINGS:
      return update(state, {
        appSettings: {
          $set: payload.data,
        },
      });
    default:
      return state;
  }
};
