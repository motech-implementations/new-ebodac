import _ from 'lodash';
import update from 'immutability-helper';

import {
  FETCH_ENTITY, DELETE_ENTITY, UPDATE_ENTITY, CREATE_ENTITY, START_FETCH_ENTITY,
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
  },
};

export default (state = initialState, action) => {
  const { type, payload, meta = {} } = action;
  const { entityType, entityId } = meta;
  switch (type) {
    case FETCH_ENTITY:
      return update(state, {
        [entityType]: { $set: _.keyBy(payload.data, 'id') },
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
        [entityType]: { $set: { [payload.data.id]: payload.data } },
      });
    case CREATE_ENTITY:
      return update(state, {
        [entityType]: { $merge: { [payload.data.id]: payload.data } },
      });
    default:
      return state;
  }
};
