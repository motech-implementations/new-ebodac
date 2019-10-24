import _ from 'lodash';
import axios from 'axios';
import Alert from 'react-s-alert';

const apiClient = axios.create({});

const setTokenHeader = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const justRejectRequestError = error => Promise.reject(error);

const handleSuccess = response => response;

const handleError = (error) => {
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

  return Promise.reject(error);
};

apiClient.interceptors.response.use(handleSuccess, handleError);

apiClient.interceptors.request.use(setTokenHeader, justRejectRequestError);

export default apiClient;
