import apiClient from '../utils/api-client';
import { UPDATE_ENROLLMENT_STATUS } from './types';
import { VACCINEE_ENTITY, VISIT_ENTITY } from '../constants/entity-types';
import { ENROLLED, UNENROLLED } from '../constants/enrollment-status';

const BASE_URL = '/api';

export const enrollVaccinee = (vaccineeId, callback) => {
  const request = apiClient.put(`${BASE_URL}/vaccinee/enroll/${vaccineeId}`, {});
  request.then(() => callback());

  return {
    type: UPDATE_ENROLLMENT_STATUS,
    payload: request,
    meta: {
      entityType: VACCINEE_ENTITY,
      entityId: vaccineeId,
      enrollmentStatus: ENROLLED,
    },
  };
};

export const unenrollVaccinee = (vaccineeId, callback) => {
  const request = apiClient.put(`${BASE_URL}/vaccinee/unenroll/${vaccineeId}`, {});
  request.then(() => callback());

  return {
    type: UPDATE_ENROLLMENT_STATUS,
    payload: request,
    meta: {
      entityType: VACCINEE_ENTITY,
      entityId: vaccineeId,
      enrollmentStatus: UNENROLLED,
    },
  };
};

export const enrollVisit = (visitId, callback) => {
  const request = apiClient.put(`${BASE_URL}/visit/enroll/${visitId}`, {});
  request.then(() => callback());

  return {
    type: UPDATE_ENROLLMENT_STATUS,
    payload: request,
    meta: {
      entityType: VISIT_ENTITY,
      entityId: visitId,
      enrollmentStatus: ENROLLED,
    },
  };
};

export const unenrollVisit = (visitId, callback) => {
  const request = apiClient.put(`${BASE_URL}/visit/unenroll/${visitId}`, {});
  request.then(() => callback());

  return {
    type: UPDATE_ENROLLMENT_STATUS,
    payload: request,
    meta: {
      entityType: VISIT_ENTITY,
      entityId: visitId,
      enrollmentStatus: UNENROLLED,
    },
  };
};
