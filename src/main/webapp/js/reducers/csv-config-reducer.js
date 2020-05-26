import update from 'immutability-helper';
import _ from 'lodash';

import {
  CREATE_CSV_CONFIG,
  SAVE_CSV_CONFIG,
  DELETE_CSV_CONFIG,
  FETCH_ALL_CSV_CONFIGS,
  START_FETCH_CSV_CONFIG,
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
  csvConfigFetched: false,
  csvConfigFetching: false,
};

export default (state = initialState, action) => {
  const { type, payload, meta = {} } = action;
  const { entityType, csvConfigId } = meta;

  switch (type) {
    case CREATE_CSV_CONFIG:
      return update(state, {
        [entityType]: { $merge: { [payload.data.id]: payload.data } },
      });
    case SAVE_CSV_CONFIG:
      return update(state, {
        [entityType]: { [payload.data.id]: { $set: payload.data } },
      });
    case DELETE_CSV_CONFIG:
      return update(state, {
        [entityType]: items => _.omit(items, csvConfigId),
      });
    case FETCH_ALL_CSV_CONFIGS:
      return update(state, {
        $set: {
          [VACCINEE_ENTITY]: {},
          [SITE_ENTITY]: {},
          [VISIT_ENTITY]: {},
          [KEY_COMMUNITY_PERSON_ENTITY]: {},
          ..._.chain(payload.data).groupBy('entity').mapValues(val => _.keyBy(val, 'id')).value(),
          csvConfigFetched: true,
          csvConfigFetching: false,
        },
      });
    case START_FETCH_CSV_CONFIG:
      return update(state, {
        csvConfigFetching: { $set: true },
      });
    default:
      return state;
  }
};
