import apiClient from '../utils/api-client';
import {
  CREATE_ENTITY,
  DELETE_ENTITY,
  FETCH_ENTITY,
  START_FETCH_ENTITY,
  UPDATE_ENTITY,
} from './types';

const BASE_URL = '/api';

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

export const deleteEntity = (entityType, entityId, callback) => {
  const request = apiClient.delete(`${BASE_URL}/${entityType}/${entityId}`);
  request.then(() => {
    if (callback) {
      callback();
    }
  });
  return {
    type: DELETE_ENTITY,
    payload: request,
    meta: {
      entityType,
      entityId,
    },
  };
};

export const updateEntity = (entityType, entity, callback) => {
  const request = apiClient.put(`${BASE_URL}/${entityType}/${entity.id}`, entity);
  request.then(() => callback());

  return {
    type: UPDATE_ENTITY,
    payload: request,
    meta: {
      entityType,
    },
  };
};

export const createEntity = (entityType, entity, callback) => {
  const request = apiClient.post(`${BASE_URL}/${entityType}`, entity);
  request.then(() => callback());

  return {
    type: CREATE_ENTITY,
    payload: request,
    meta: {
      entityType,
    },
  };
};
