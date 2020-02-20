import _ from 'lodash';
import update from 'immutability-helper';

import {
  FETCH_IVR_PROVIDER_CONFIG, FETCH_ALL_IVR_PROVIDER_CONFIGS,
  CREATE_IVR_PROVIDER_CONFIG, SAVE_IVR_PROVIDER_CONFIG, DELETE_IVR_PROVIDER_CONFIG,
} from '../actions/types';

const initialState = {
  ivrProviderConfigs: {},
};

export default (state = initialState, action) => {
  const { type, payload, meta = {} } = action;
  const { ivrProviderConfigId } = meta;

  if (action.error) {
    return state;
  }

  switch (type) {
    case FETCH_IVR_PROVIDER_CONFIG:
      return update(state, {
        ivrProviderConfigs: {
          [payload.data.id]: {
            $set: payload.data,
          },
        },
      });
    case FETCH_ALL_IVR_PROVIDER_CONFIGS:
      return update(state, {
        ivrProviderConfigs: {
          $set: _.keyBy(payload.data, 'id'),
        },
      });
    case CREATE_IVR_PROVIDER_CONFIG:
      return update(state, {
        ivrProviderConfigs: {
          $merge: {
            [payload.data.id]: payload.data,
          },
        },
      });
    case SAVE_IVR_PROVIDER_CONFIG:
      return update(state, {
        ivrProviderConfigs: {
          [payload.data.id]: {
            $set: payload.data,
          },
        },
      });
    case DELETE_IVR_PROVIDER_CONFIG:
      return update(state, {
        ivrProviderConfigs: items => _.omit(items, ivrProviderConfigId),
      });
    default:
      return state;
  }
};
