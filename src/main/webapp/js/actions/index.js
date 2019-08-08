import apiClient from '../utils/api-client';
import { FETCH_VACCINEES } from './types';

const BASE_URL = '/api';
const VACCINEES = `${BASE_URL}/vaccinee`;

export default function (callback) {
  return function action(dispatch) {
    const request = apiClient.get(VACCINEES);
    return request.then(
      (response) => {
        dispatch({
          type: FETCH_VACCINEES,
          payload: response,
        });
        callback();
      },
    );
  };
}
