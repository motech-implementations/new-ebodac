import _ from 'lodash';
import axios from 'axios';
import base64 from 'base-64';

import {
  AUTH_ERROR,
  AUTH_USER, REGISTER_USER,
  RESET_LOGOUT_COUNTER,
  UNAUTH_USER,
  AUTHORIZE_ONLINE,
  AUTHORIZE_OFFLINE,
} from './types';
import { getHash, checkHash } from '../utils/offline-helper';

const BASE_URL = '/api';
const AUTH_URL = `${BASE_URL}/oauth/token`;
const CLIENT_ID = 'trusted-client';
const CLIENT_SECRET = 'secret';

export const authError = error => ({
  type: AUTH_ERROR,
  payload: error,
});

export const signinUser = ({ username, password, savedLogin }) => (dispatch) => {
  getHash(password, (hash) => {
    axios({
      method: 'POST',
      url: AUTH_URL,
      data: `grant_type=password&username=${username}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
    }).then((res) => {
      dispatch({
        type: AUTHORIZE_ONLINE,
        payload: res,
        meta: { username, hash },
      });
    }).catch((err) => {
      checkHash(password, _.get(savedLogin, 'hash', ''), (hashCheckResult) => {
        if (!err.response || err.response.status > 500) {
          if (savedLogin && hashCheckResult) {
            dispatch({
              type: AUTHORIZE_OFFLINE,
              meta: {
                savedLogin,
              },
            });
          } else if (savedLogin && !hashCheckResult) {
            dispatch(authError('Wrong username or password. Please try again.'));
          } else {
            dispatch(authError('Please try again in online mode.'));
          }
        } else {
          dispatch(authError('Wrong username or password. Please try again.'));
        }
      });
    });
  });
};

export const useRefreshToken = (refreshToken, callback) => dispatch => axios({
  method: 'post',
  url: AUTH_URL,
  auth: {
    username: CLIENT_ID,
    password: CLIENT_SECRET,
  },
  params: {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  },
})
  .catch(() => {
    dispatch(authError('Error occurred when refreshing the user session'));
  })
  .then((response) => {
    dispatch({
      type: AUTH_USER,
      payload: {
        token: response.data.access_token,
        refreshToken: response.data.refresh_token,
      },
    });
    if (callback) {
      return callback();
    }
    return null;
  });

export const signoutUser = () => ({ type: UNAUTH_USER });

export const registerUser = (values, callback) => (dispatch) => {
  const request = axios.post(`${BASE_URL}/register`, values);
  request.catch(() => {
    const failure = {
      message: 'Registration Error. Please try again.',
      success: false,
    };
    dispatch({
      type: REGISTER_USER,
      payload: failure,
    });
  })
    .then(() => {
      const success = {
        message: 'Registration Success. Administrator need to activate your account.',
        success: true,
      };
      dispatch({
        type: REGISTER_USER,
        payload: success,
      });
      if (callback) {
        callback();
      }
    });
};

export const resetLogoutCounter = () => ({
  type: RESET_LOGOUT_COUNTER,
});
