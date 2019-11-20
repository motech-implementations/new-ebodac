import apiClient from '../utils/api-client';

import {
  FETCH_ALL_CSV_CONFIGS,
  START_FETCH_CSV_CONFIG,
  CREATE_CSV_CONFIG,
  SAVE_CSV_CONFIG,
  DELETE_CSV_CONFIG,
} from './types';

const BASE_URL = '/api';
const CSV_CONFIG = `${BASE_URL}/csvConfig`;

export const fetchAllCsvConfigs = () => (dispatch) => {
  const request = apiClient.get(CSV_CONFIG);
  dispatch({
    type: START_FETCH_CSV_CONFIG,
  });
  dispatch({
    type: FETCH_ALL_CSV_CONFIGS,
    payload: request,
  });
};

export const createCsvConfig = (entityType, csvConfig, callback) => {
  const request = apiClient.post(CSV_CONFIG, csvConfig);
  request.then(() => callback());
  return {
    type: CREATE_CSV_CONFIG,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const saveCsvConfig = (entityType, csvConfig, callback) => {
  const request = apiClient.put(`${CSV_CONFIG}/${csvConfig.id}`, csvConfig);
  request.then(() => callback());
  return {
    type: SAVE_CSV_CONFIG,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const deleteCsvConfig = (entityType, csvConfigId, callback) => {
  const request = apiClient.delete(`${CSV_CONFIG}/${csvConfigId}`);
  request.then(() => callback());
  return {
    type: DELETE_CSV_CONFIG,
    payload: request,
    meta: {
      csvConfigId,
      entityType,
    },
  };
};
