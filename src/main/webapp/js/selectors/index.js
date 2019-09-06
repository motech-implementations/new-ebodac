import _ from 'lodash';
import { createSelector } from 'reselect';

const getFieldConfigByEntity = (state, { entityType }) => state.fieldConfig[entityType];

const filterAndMapFields = (fields, isHidden) => (
  _.chain(fields).values()
    .filter(field => field.hidden === isHidden)
    .sortBy('fieldOrder')
    .value()
);

export const getVisibleFields = createSelector(
  getFieldConfigByEntity, fields => filterAndMapFields(fields, false),
);

export const getHiddenFields = createSelector(
  getFieldConfigByEntity, fields => filterAndMapFields(fields, true),
);

export const getFieldConfigById = (state, { entityType, fieldId }) => (
  state.fieldConfig[entityType][fieldId]
);
