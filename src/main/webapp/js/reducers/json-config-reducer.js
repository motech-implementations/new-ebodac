import update from 'immutability-helper';
import _ from 'lodash';

import {
  CREATE_JSON_CONFIG,
  SAVE_JSON_CONFIG,
  DELETE_JSON_CONFIG,
  FETCH_ALL_JSON_CONFIGS,
  START_FETCH_JSON_CONFIG,
} from '../actions/types';
import {
  VACCINEE_ENTITY,
  SITE_ENTITY,
  VISIT_ENTITY,
  KEY_COMMUNITY_PERSON_ENTITY,
} from '../constants/entity-types';

const initialState = {
  [VACCINEE_ENTITY]: {},
  [SITE_ENTITY]: {},
  [VISIT_ENTITY]: {},
  [KEY_COMMUNITY_PERSON_ENTITY]: {},
  jsonConfigFetched: false,
  jsonConfigFetching: false,
};

export default (state = initialState, action) => {
  const { type, payload, meta = {} } = action;
  const { entityType, jsonConfigId } = meta;

  switch (type) {
    case CREATE_JSON_CONFIG:
      return update(state, {
        [entityType]: { $merge: { [payload.data.id]: payload.data } },
      });
    case SAVE_JSON_CONFIG:
      return update(state, {
        [entityType]: { [payload.data.id]: { $set: payload.data } },
      });
    case DELETE_JSON_CONFIG:
      return update(state, {
        [entityType]: items => _.omit(items, jsonConfigId),
      });
    case FETCH_ALL_JSON_CONFIGS:
      return update(state, {
        $set: {
          [VACCINEE_ENTITY]: {},
          [SITE_ENTITY]: {},
          [VISIT_ENTITY]: {},
          [KEY_COMMUNITY_PERSON_ENTITY]: {},
          ..._.chain(payload.data).groupBy('entity').mapValues(val => _.keyBy(val, 'id')).value(),
          jsonConfigFetched: true,
          jsonConfigFetching: false,
        },
      });
    case START_FETCH_JSON_CONFIG:
      return update(state, {
        jsonConfigFetching: { $set: true },
      });
    default:
      return state;
  }
};
