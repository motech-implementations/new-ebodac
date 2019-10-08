import Client from 'client-oauth2';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import apiClient from '../utils/api-client';

import {
  FETCH_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  CREATE_ENTITY,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_COUNTER_LOGOUT_TIME,
  CREATE_FIELD_CONFIG,
  SAVE_FIELD_CONFIG,
  DELETE_FIELD_CONFIG,
  CHANGE_FIELD_VISIBILITY,
  CHANGE_FIELD_ORDER,
  SAVE_FIELD_CONFIG_ORDER,
  FETCH_ALL_FIELD_CONFIGS,
  START_FETCH_FIELD_CONFIG,
  START_FETCH_ENTITY,
} from './types';

const BASE_URL = '/api';
const AUTH_URL = `${BASE_URL}/oauth/token`;
const CLIENT_ID = 'trusted-client';
const CLIENT_SECRET = 'secret';
const FIELD_CONFIG = `${BASE_URL}/fieldConfig`;

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

export const fetchEntity = entityType => (dispatch) => {
  const request = apiClient.get(`${BASE_URL}/${entityType}`);
  dispatch({
    type: START_FETCH_ENTITY,
    meta: {
      entityType,
    },
  });
  dispatch({
    type: FETCH_ENTITY,
    payload: request,
    meta: {
      entityType,
    },
  });
};

export const deleteEntity = (entityType, entityId) => {
  const request = apiClient.delete(`${BASE_URL}/${entityType}/${entityId}`);
  return {
    type: DELETE_ENTITY,
    payload: request,
    meta: {
      entityType,
      entityId,
    },
  };
};

export const updateEntity = (entityType, entity) => {
  const request = apiClient.put(`${BASE_URL}/${entityType}/${entity.id}`, entity);
  return {
    type: UPDATE_ENTITY,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const createEntity = (entityType, entity) => {
  const request = apiClient.post(`${BASE_URL}/${entityType}`, entity);
  return {
    type: CREATE_ENTITY,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const fetchAllFieldConfigs = () => (dispatch) => {
  const request = apiClient.get(FIELD_CONFIG);
  dispatch({
    type: START_FETCH_FIELD_CONFIG,
  });
  dispatch({
    type: FETCH_ALL_FIELD_CONFIGS,
    payload: request,
  });
};

export const createFieldConfig = (entityType, item) => {
  const request = apiClient.post(`${FIELD_CONFIG}`, item);
  return {
    type: CREATE_FIELD_CONFIG,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const saveFieldConfig = (entityType, item) => {
  const request = apiClient.put(`${FIELD_CONFIG}/${item.id}`, item);
  return {
    type: SAVE_FIELD_CONFIG,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const saveFieldConfigOrder = (entityType, items) => {
  const request = apiClient.post(`${FIELD_CONFIG}/saveOrder`, items);
  return {
    type: SAVE_FIELD_CONFIG_ORDER,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const deleteFieldConfig = (entityType, fieldConfig) => {
  const request = apiClient.delete(`${FIELD_CONFIG}/${fieldConfig.id}`);
  return {
    type: DELETE_FIELD_CONFIG,
    payload: request,
    meta: {
      entityType,
      fieldConfig,
    },
  };
};

export const changeFieldVisibility = (entityType, item) => ({
  type: CHANGE_FIELD_VISIBILITY,
  payload: item,
  meta: {
    entityType,
  },
});

export const changeFieldOrder = (entityType, item) => ({
  type: CHANGE_FIELD_ORDER,
  payload: item,
  meta: {
    entityType,
  },
});
