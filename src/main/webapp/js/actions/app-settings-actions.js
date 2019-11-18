import apiClient from '../utils/api-client';
import { FETCH_APP_SETTINGS, UPDATE_APP_SETTINGS } from './types';

const BASE_URL = '/api';

export const fetchAppSettings = () => {
  const request = apiClient.get(`${BASE_URL}/appSettings`);
  return {
    type: FETCH_APP_SETTINGS,
    payload: request,
  };
};

export const updateAppSettings = (appSettings, callback) => {
  const request = apiClient.put(`${BASE_URL}/appSettings`, appSettings);
  request.then(() => callback());
  return {
    type: UPDATE_APP_SETTINGS,
    payload: request,
  };
};
