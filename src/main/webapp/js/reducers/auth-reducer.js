import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  RESET_LOGOUT_COUNTER,
  AUTHORIZE_ONLINE,
  AUTHORIZE_OFFLINE,
} from '../actions/types';

const initialState = {
  error: null,
  authenticated: false,
  counterLogoutTime: 600,
  resetCounter: false,
  registrationMessage: '',
  registrationResult: false,
  permissions: [],
  savedLogins: {},
  accessToken: null,
  refreshToken: null,
};

export default (state = initialState, action) => {
  if (action.error) {
    return state;
  }
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        accessToken: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        accessToken: null,
        refreshToken: null,
      };
    case RESET_LOGOUT_COUNTER:
      return {
        ...state,
        resetCounter: !state.resetCounter,
      };
    case AUTH_ERROR:
      return { ...state, error: action.payload, authenticated: false };
    case AUTHORIZE_OFFLINE: {
      const { savedLogin } = action.meta;
      return {
        ...state,
        authenticated: true,
        error: '',
        permissions: _.get(savedLogin, 'permissions', []),
      };
    }
    case AUTHORIZE_ONLINE: {
      const { username, hash } = action.meta;
      // eslint-disable-next-line camelcase
      const { access_token, exp_period, refresh_token } = action.payload.data;
      const permissions = jwtDecode(access_token).authorities;
      return {
        ...state,
        error: '',
        authenticated: true,
        permissions,
        savedLogins: {
          ...state.savedLogins,
          [username]: { hash, permissions },
        },
        counterLogoutTime: exp_period,
        accessToken: access_token,
        refreshToken: refresh_token,
      };
    }
    default:
  }

  return state;
};
