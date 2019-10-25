import _ from 'lodash';
import update from 'immutability-helper';

import {
  FETCH_FIELD_CONFIG,
  CREATE_FIELD_CONFIG,
  SAVE_FIELD_CONFIG,
  DELETE_FIELD_CONFIG,
  CHANGE_FIELD_VISIBILITY,
  CHANGE_FIELD_ORDER,
  SAVE_FIELD_CONFIG_ORDER,
  FETCH_ALL_FIELD_CONFIGS,
  START_FETCH_FIELD_CONFIG,
} from '../actions/types';
import {
  VACCINEE_ENTITY,
  KEY_COMMUNITY_PERSON_ENTITY,
  SITE_ENTITY,
  VISIT_ENTITY,
  ROLE_ENTITY,
  LANGUAGE_ENTITY,
  CAMPAIGN_MESSAGE_ENTITY,
  VISIT_TYPE_ENTITY,
  GROUP_ENTITY,
  USER_ENTITY,
} from '../constants/entity-types';
import {
  roleFieldConfig,
  languageFieldConfig,
  campaignMessageFieldConfig,
  visitTypeFieldConfig,
  userFieldConfig,
} from '../constants/field-configs';

const initialState = {
  [VACCINEE_ENTITY]: {},
  [KEY_COMMUNITY_PERSON_ENTITY]: {},
  [SITE_ENTITY]: {},
  [VISIT_ENTITY]: {},
  [GROUP_ENTITY]: {},
  [ROLE_ENTITY]: roleFieldConfig,
  [LANGUAGE_ENTITY]: languageFieldConfig,
  [CAMPAIGN_MESSAGE_ENTITY]: campaignMessageFieldConfig,
  [VISIT_TYPE_ENTITY]: visitTypeFieldConfig,
  [USER_ENTITY]: userFieldConfig,
  fieldConfigFetched: false,
  fieldConfigFetching: false,
};

export default (state = initialState, action) => {
  const { type, payload, meta = {} } = action;
  const { entityType, fieldConfig } = meta;
  if (action.error) {
    return state;
  }

  switch (type) {
    case FETCH_FIELD_CONFIG:
      return update(state, {
        [entityType]: { $set: _.keyBy(payload.data, 'id') },
      });
    case FETCH_ALL_FIELD_CONFIGS:
      return update(state, {
        $merge: _.chain(payload.data).groupBy('entity').mapValues(val => _.keyBy(val, 'id')).value(),
        fieldConfigFetched: { $set: true },
        fieldConfigFetching: { $set: false },
      });
    case START_FETCH_FIELD_CONFIG:
      return update(state, {
        fieldConfigFetching: { $set: true },
      });
    case CREATE_FIELD_CONFIG:
      return update(state, {
        [entityType]: { $merge: { [payload.data.id]: payload.data } },
      });
    case SAVE_FIELD_CONFIG:
      return update(state, {
        [entityType]: {
          [payload.data.id]:
              item => ({ ...payload.data, hidden: item.hidden, fieldOrder: item.fieldOrder }),
        },
      });
    case SAVE_FIELD_CONFIG_ORDER:
      return update(state, {
        [entityType]: { $merge: _.keyBy(payload.data, 'id') },
      });
    case DELETE_FIELD_CONFIG:
      return update(state, {
        [entityType]: items => _.chain(items).omit(fieldConfig.id).mapValues((item) => {
          if (item.fieldOrder > fieldConfig.fieldOrder) {
            return { ...item, fieldOrder: item.fieldOrder - 1, changed: true };
          }

          return item;
        }).value(),
      });
    case CHANGE_FIELD_VISIBILITY:
      return update(state, {
        [entityType]: items => _.mapValues(items, (item) => {
          const { hidden, oldOrder, newOrder } = payload;

          if (item.id === payload.id) {
            return {
              ...item, hidden, fieldOrder: newOrder, changed: true,
            };
          }

          if (item.hidden === hidden && item.fieldOrder >= newOrder) {
            return { ...item, fieldOrder: item.fieldOrder + 1, changed: true };
          }

          if (item.hidden !== hidden && item.fieldOrder > oldOrder) {
            return { ...item, fieldOrder: item.fieldOrder - 1, changed: true };
          }

          return item;
        }),
      });
    case CHANGE_FIELD_ORDER:
      return update(state, {
        [entityType]: items => _.mapValues(items, (item) => {
          const { hidden, oldOrder, newOrder } = payload;

          if (item.id === payload.id) {
            return {
              ...item, fieldOrder: newOrder, changed: true,
            };
          }

          if (item.hidden === hidden
            && item.fieldOrder < oldOrder && item.fieldOrder >= newOrder) {
            return { ...item, fieldOrder: item.fieldOrder + 1, changed: true };
          }

          if (item.hidden === hidden
            && item.fieldOrder > oldOrder && item.fieldOrder <= newOrder) {
            return { ...item, fieldOrder: item.fieldOrder - 1, changed: true };
          }

          return item;
        }),
      });
    default:
      return state;
  }
};
