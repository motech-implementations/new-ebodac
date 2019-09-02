import axios from 'axios';

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

apiClient.interceptors.request.use(setTokenHeader, justRejectRequestError);

export default apiClient;
