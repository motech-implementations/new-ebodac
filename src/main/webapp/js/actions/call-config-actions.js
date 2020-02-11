import apiClient from '../utils/api-client';
import {
  FETCH_CALL_CONFIG,
  FETCH_ALL_CALL_CONFIGS,
  CREATE_CALL_CONFIG,
  SAVE_CALL_CONFIG,
  DELETE_CALL_CONFIG,
} from './types';

const BASE_URL = '/api';
const CALL_CONFIG = `${BASE_URL}/callConfig`;

export const fetchCallConfig = (callConfigId) => {
  const request = apiClient.get(`${CALL_CONFIG}/${callConfigId}`);
  return {
    type: FETCH_CALL_CONFIG,
    payload: request,
  };
};

export const fetchAllCallConfigs = () => {
  const request = apiClient.get(CALL_CONFIG);
  return {
    type: FETCH_ALL_CALL_CONFIGS,
    payload: request,
  };
};

export const createCallConfig = (callConfig, callback) => {
  const request = apiClient.post(CALL_CONFIG, callConfig);
  request.then(() => callback());
  return {
    type: CREATE_CALL_CONFIG,
    payload: request,
  };
};

export const saveCallConfig = (callConfig, callback) => {
  const request = apiClient.put(`${CALL_CONFIG}/${callConfig.id}`, callConfig);
  request.then(() => callback());
  return {
    type: SAVE_CALL_CONFIG,
    payload: request,
  };
};

export const deleteCallConfig = (callConfigId, callback) => {
  const request = apiClient.delete(`${CALL_CONFIG}/${callConfigId}`);
  request.then(() => callback());
  return {
    type: DELETE_CALL_CONFIG,
    payload: request,
    meta: {
      callConfigId,
    },
  };
};
