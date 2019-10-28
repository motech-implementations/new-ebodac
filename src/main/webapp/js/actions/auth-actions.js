import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Client from 'client-oauth2';
import {
  AUTH_ERROR,
  AUTH_USER, REGISTER_USER,
  SET_COUNTER_LOGOUT_TIME,
  SET_PERMISSIONS,
  UNAUTH_USER,
} from './types';

const BASE_URL = '/api';
const AUTH_URL = `${BASE_URL}/oauth/token`;
const CLIENT_ID = 'trusted-client';
const CLIENT_SECRET = 'secret';

const authClient = new Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  accessTokenUri: AUTH_URL,
});

export const authError = error => ({
  type: AUTH_ERROR,
  payload: error,
});

export const signinUser = ({ username, password }, callback) => (dispatch) => {
  authClient.owner.getToken(username, password)
    .then((response) => {
      dispatch({ type: AUTH_USER });
      const tokenDecoded = jwtDecode(response.accessToken);
      dispatch({
        type: SET_PERMISSIONS,
        payload: tokenDecoded.authorities,
      });
      dispatch({
        type: SET_COUNTER_LOGOUT_TIME,
        payload: tokenDecoded.exp_period,
      });
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('token', response.accessToken);
      callback();
    })
    .catch(() => {
      dispatch(authError('Wrong username or password. Please try again.'));
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
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    dispatch({ type: AUTH_USER });
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
