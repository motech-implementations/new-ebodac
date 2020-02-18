import _ from 'lodash';
import update from 'immutability-helper';

import {
  FETCH_ENTITY, DELETE_ENTITY, UPDATE_ENTITY, CREATE_ENTITY, START_FETCH_ENTITY,
  UPDATE_ENROLLMENT_STATUS,
} from '../actions/types';

import {
  PERMISSION_ENTITY,
  LANGUAGE_ENTITY,
  GROUP_ENTITY,
  VISIT_ENTITY,
  VACCINEE_ENTITY,
  KEY_COMMUNITY_PERSON_ENTITY,
  SITE_ENTITY,
  ROLE_ENTITY,
  VISIT_TYPE_ENTITY,
  CAMPAIGN_MESSAGE_ENTITY,
  USER_ENTITY,
  VACCINEE_CALL_STATUS_REPORT,
} from '../constants/entity-types';

const initialState = {
  [VACCINEE_ENTITY]: {},
  [VISIT_ENTITY]: {},
  [LANGUAGE_ENTITY]: {},
  [KEY_COMMUNITY_PERSON_ENTITY]: {},
  [SITE_ENTITY]: {},
  [VISIT_TYPE_ENTITY]: {},
  [GROUP_ENTITY]: {},
  [ROLE_ENTITY]: {},
  [PERMISSION_ENTITY]: {},
  [CAMPAIGN_MESSAGE_ENTITY]: {},
  [USER_ENTITY]: {},
  [VACCINEE_CALL_STATUS_REPORT]: {},
  metadata: {
    [VACCINEE_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [VISIT_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [LANGUAGE_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [KEY_COMMUNITY_PERSON_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [SITE_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [VISIT_TYPE_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [GROUP_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [ROLE_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [PERMISSION_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [CAMPAIGN_MESSAGE_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [USER_ENTITY]: {
      fetched: false,
      fetching: false,
    },
    [VACCINEE_CALL_STATUS_REPORT]: {
      fetched: false,
      fetching: false,
    },
  },
};

export default (state = initialState, action) => {
  const { type, payload, meta = {} } = action;
  const { entityType, entityId } = meta;
  if (action.error) {
    return state;
  }
  switch (type) {
    case FETCH_ENTITY:
      return update(state, {
        [entityType]: {
          $set: _.keyBy(_.map(payload.data, elem => ({
            ...elem,
            extraFields: _.keyBy(_.get(elem, 'extraFields', {}), 'name'),
          })), 'id'),
        },
        metadata: {
          [entityType]: {
            fetched: { $set: true },
            fetching: { $set: false },
          },
        },
      });
    case START_FETCH_ENTITY:
      return update(state, {
        metadata: {
          [entityType]: {
            fetching: { $set: true },
          },
        },
      });
    case DELETE_ENTITY:
      return update(state, {
        [entityType]: items => _.omit(items, entityId),
      });
    case UPDATE_ENTITY:
      return update(state, {
        [entityType]: {
          [payload.data.id]: {
            $set: {
              ...payload.data,
              extraFields: _.keyBy(_.get(payload.data, 'extraFields', {}), 'name'),
            },
          },
        },
      });
    case CREATE_ENTITY:
      return update(state, {
        [entityType]: {
          $merge: {
            [payload.data.id]: {
              ...payload.data,
              extraFields: _.keyBy(_.get(payload.data, 'extraFields', {}), 'name'),
            },
          },
        },
      });
    case UPDATE_ENROLLMENT_STATUS:
      return update(state, {
        [entityType]: {
          [entityId]: {
            status: { $set: meta.enrollmentStatus },
          },
        },
      });
    default:
      return state;
  }
};
