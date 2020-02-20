import apiClient from '../utils/api-client';
import {
  FETCH_IVR_PROVIDER_CONFIG,
  FETCH_ALL_IVR_PROVIDER_CONFIGS,
  CREATE_IVR_PROVIDER_CONFIG,
  SAVE_IVR_PROVIDER_CONFIG,
  DELETE_IVR_PROVIDER_CONFIG,
} from './types';

const BASE_URL = '/api';
const IVR_PROVIDER_CONFIG = `${BASE_URL}/ivrProviderConfig`;

export const fetchIvrProviderConfig = (ivrProviderConfigId) => {
  const request = apiClient.get(`${IVR_PROVIDER_CONFIG}/${ivrProviderConfigId}`);
  return {
    type: FETCH_IVR_PROVIDER_CONFIG,
    payload: request,
  };
};

export const fetchAllIvrProviderConfigs = () => {
  const request = apiClient.get(IVR_PROVIDER_CONFIG);
  return {
    type: FETCH_ALL_IVR_PROVIDER_CONFIGS,
    payload: request,
  };
};

export const createIvrProviderConfig = (ivrProviderConfig, callback) => {
  const request = apiClient.post(IVR_PROVIDER_CONFIG, ivrProviderConfig);
  request.then(() => callback());
  return {
    type: CREATE_IVR_PROVIDER_CONFIG,
    payload: request,
  };
};

export const saveIvrProviderConfig = (ivrProviderConfig, callback) => {
  const request = apiClient.put(`${IVR_PROVIDER_CONFIG}/${ivrProviderConfig.id}`, ivrProviderConfig);
  request.then(() => callback());
  return {
    type: SAVE_IVR_PROVIDER_CONFIG,
    payload: request,
  };
};

export const deleteIvrProviderConfig = (ivrProviderConfigId, callback) => {
  const request = apiClient.delete(`${IVR_PROVIDER_CONFIG}/${ivrProviderConfigId}`);
  request.then(() => callback());
  return {
    type: DELETE_IVR_PROVIDER_CONFIG,
    payload: request,
    meta: {
      ivrProviderConfigId,
    },
  };
};
