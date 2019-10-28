import apiClient from '../utils/api-client';
import {
  CHANGE_FIELD_ORDER,
  CHANGE_FIELD_VISIBILITY,
  CREATE_FIELD_CONFIG, DELETE_FIELD_CONFIG,
  FETCH_ALL_FIELD_CONFIGS, SAVE_FIELD_CONFIG, SAVE_FIELD_CONFIG_ORDER,
  START_FETCH_FIELD_CONFIG,
} from './types';

const BASE_URL = '/api';
const FIELD_CONFIG = `${BASE_URL}/fieldConfig`;

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
