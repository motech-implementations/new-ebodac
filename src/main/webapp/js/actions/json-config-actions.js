import apiClient from '../utils/api-client';

import {
  FETCH_ALL_JSON_CONFIGS,
  START_FETCH_JSON_CONFIG,
  CREATE_JSON_CONFIG,
  SAVE_JSON_CONFIG,
  DELETE_JSON_CONFIG,
} from './types';

const BASE_URL = '/api';
const JSON_CONFIG = `${BASE_URL}/jsonConfig`;

export const fetchAllJsonConfigs = () => (dispatch) => {
  const request = apiClient.get(JSON_CONFIG);
  dispatch({
    type: START_FETCH_JSON_CONFIG,
  });
  dispatch({
    type: FETCH_ALL_JSON_CONFIGS,
    payload: request,
  });
};

export const createJsonConfig = (entityType, jsonConfig, callback) => {
  const request = apiClient.post(JSON_CONFIG, jsonConfig);
  request.then(() => callback());
  return {
    type: CREATE_JSON_CONFIG,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const saveJsonConfig = (entityType, jsonConfig, callback) => {
  const request = apiClient.put(`${JSON_CONFIG}/${jsonConfig.id}`, jsonConfig);
  request.then(() => callback());
  return {
    type: SAVE_JSON_CONFIG,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const deleteJsonConfig = (entityType, jsonConfigId, callback) => {
  const request = apiClient.delete(`${JSON_CONFIG}/${jsonConfigId}`);
  request.then(() => callback());
  return {
    type: DELETE_JSON_CONFIG,
    payload: request,
    meta: {
      jsonConfigId,
      entityType,
    },
  };
};
