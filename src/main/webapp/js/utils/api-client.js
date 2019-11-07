import _ from 'lodash';
import axios from 'axios';
import Alert from 'react-s-alert';

import store from '../store';
import { useRefreshToken, signoutUser } from '../actions/auth-actions';

export const { dispatch } = store;
const apiClient = axios.create({});

const setTokenHeader = (config) => {
  const token = _.get(store.getState(), 'auth.accessToken', '');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const justRejectRequestError = error => Promise.reject(error);

const handleSuccess = response => response;

const handleError = (error) => {
  const { refreshToken } = store.getState().auth;

  switch (error.response.status) {
    case 401:
      if (refreshToken) {
        return dispatch(useRefreshToken(refreshToken, () => apiClient.request(error.config)));
      }
      dispatch(signoutUser());
      break;
    case 403:
      Alert.error('Access denied.');
      break;
    default: {
      // eslint-disable-next-line no-prototype-builtins
      if (error.response.hasOwnProperty('status')) {
        Alert.error(`Error occurred: ${_.get(error, 'response.data.message', 'Check log for more details')}`, {
          timeout: 5000,
        });
      } else {
        Alert.error('Error occurred: Check log for more details', {
          timeout: 5000,
        });
      }
    }
  }
  return Promise.reject(error);
};

apiClient.interceptors.response.use(handleSuccess, handleError);

apiClient.interceptors.request.use(setTokenHeader, justRejectRequestError);

export default apiClient;
