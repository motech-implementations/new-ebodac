import _ from 'lodash';
import update from 'immutability-helper';

import {
  FETCH_ENTITY, DELETE_ENTITY, UPDATE_ENTITY, CREATE_ENTITY,
} from '../actions/types';

const initialState = {
  vaccinee: {},
  visit: {},
  language: {},
  keyCommunityPerson: {},
  site: {},
  visitType: {},
  group: {},
  role: {},
  permission: {},
};

export default (state = initialState, action) => {
  const { type, payload, meta = {} } = action;
  const { entityType, entityId } = meta;
  switch (type) {
    case FETCH_ENTITY:
      return update(state, {
        [entityType]: { $set: _.keyBy(payload.data, 'id') },
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
