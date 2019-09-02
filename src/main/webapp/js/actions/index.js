import Client from 'client-oauth2';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import apiClient from '../utils/api-client';
import {
  FETCH_VACCINEES,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_COUNTER_LOGOUT_TIME,
} from './types';


const BASE_URL = '/api';
const AUTH_URL = `${BASE_URL}/oauth/token`;
const CLIENT_ID = 'trusted-client';
const CLIENT_SECRET = 'secret';
const VACCINEES = `${BASE_URL}/vaccinee`;
const FIELD_CONFIG = `${BASE_URL}/fieldConfig`;

const authClient = new Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  accessTokenUri: AUTH_URL,
});

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signinUser({ username, password }, callback) {
  return (dispatch) => {
    authClient.owner.getToken(username, password)
      .then((response) => {
        dispatch({ type: AUTH_USER });
        const tokenDecoded = jwtDecode(response.accessToken);
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
}

export function useRefreshToken(refreshToken, callback) {
  return dispatch => axios({
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
}

export function signoutUser() {
  return { type: UNAUTH_USER };
}

export function fetchVaccinees(callback) {
  return function action(dispatch) {
    const request = apiClient.get(VACCINEES);
    return request.then(
      (response) => {
        dispatch({
          type: FETCH_VACCINEES,
          payload: response,
        });
        callback();
      },
    );
  };
}

export function fetchFieldConfig(entity, type, callback) {
  return function action(dispatch) {
    const request = apiClient.get(`${FIELD_CONFIG}/${entity}`);
    return request.then(
      (response) => {
        dispatch({
          type,
          payload: response,
        });
        callback();
      },
    );
  };
}

export function createFieldConfig(type, item) {
  const request = apiClient.post(`${FIELD_CONFIG}`, item);
  return {
    type,
    payload: request,
  };
}

export function saveFieldConfig(type, item) {
  const request = apiClient.put(`${FIELD_CONFIG}/${item.id}`, item);
  return {
    type,
    payload: request,
  };
}

export function deleteFieldConfig(type, item, callback) {
  return function action(dispatch) {
    const request = apiClient.delete(`${FIELD_CONFIG}/${item.id}`);
    return request.then(
      () => {
        dispatch({
          type,
          payload: item.id,
        });
        callback();
      },
    );
  };
}
