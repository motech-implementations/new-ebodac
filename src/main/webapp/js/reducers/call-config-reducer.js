import _ from 'lodash';
import update from 'immutability-helper';

import {
  FETCH_CALL_CONFIG, FETCH_ALL_CALL_CONFIGS,
  CREATE_CALL_CONFIG, SAVE_CALL_CONFIG, DELETE_CALL_CONFIG,
} from '../actions/types';

const initialState = {
  callConfigs: {},
};

export default (state = initialState, action) => {
  const { type, payload, meta = {} } = action;
  const { callConfigId } = meta;

  if (action.error) {
    return state;
  }

  switch (type) {
    case FETCH_CALL_CONFIG:
      return update(state, {
        callConfigs: {
          [payload.data.id]: {
            $set: payload.data,
          },
        },
      });
    case FETCH_ALL_CALL_CONFIGS:
      return update(state, {
        callConfigs: {
          $set: _.keyBy(payload.data, 'id'),
        },
      });
    case CREATE_CALL_CONFIG:
      return update(state, {
        callConfigs: {
          $merge: {
            [payload.data.id]: payload.data,
          },
        },
      });
    case SAVE_CALL_CONFIG:
      return update(state, {
        callConfigs: {
          [payload.data.id]: {
            $set: payload.data,
          },
        },
      });
    case DELETE_CALL_CONFIG:
      return update(state, {
        callConfigs: items => _.omit(items, callConfigId),
      });
    default:
      return state;
  }
};
