import _ from 'lodash';
import { createSelector } from 'reselect';

const getFieldConfigByEntity = (state, { entityType }) => state.fieldConfig[entityType];

export const getEntityFieldValue = (state,
  { entityType, value, relatedField }) => {
  if (value in state.entity[entityType]) {
    return state.entity[entityType][value][relatedField];
  }
  return null;
};

const getEntityByName = (state, { entityType }) => state.entity[entityType];

const mapToOptions = (options,
  relatedField) => _.map(options, row => ({ label: row[relatedField], value: row.id }));

export const getEntityMemberById = (state, { entityType, id }) => state.entity[entityType][id];

const filterAndMapFields = (fields, isHidden) => (
  _.chain(fields).values()
    .filter(field => field.hidden === isHidden)
    .sortBy('fieldOrder')
    .value()
);

const mapToArray = object => Object.values(object);

const getRelatedField = (state, { relatedField }) => relatedField;

export const getVisibleFields = createSelector(
  getFieldConfigByEntity, fields => filterAndMapFields(fields, false),
);

export const getHiddenFields = createSelector(
  getFieldConfigByEntity, fields => filterAndMapFields(fields, true),
);

export const getFieldConfigById = (state, { entityType, fieldId }) => (
  state.fieldConfig[entityType][fieldId]
);

export const getEntityArrayByName = createSelector(
  getEntityByName, entity => mapToArray(entity),
);

export const mapEntityToOptions = createSelector(
  getEntityArrayByName,
  getRelatedField,
  mapToOptions,
);
