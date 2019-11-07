import _ from 'lodash';
import { createSelector } from 'reselect';

export const getFieldConfigByEntity = (state, { entityType }) => (
  state.fieldConfig[entityType]
);

export const getCsvConfigById = (state, { entity, csvConfigId }) => (
  csvConfigId ? state.csvConfig[entity][csvConfigId] : {}
);

export const getCsvConfigArray = (state => (
  _.chain(state.csvConfig)
    .omit(state.csvConfig, ['csvConfigFetching', 'csvConfigFetched'])
    .reduce((accumulator, currentValue) => accumulator
      .concat(Object.values(currentValue)), []).value()
));

export const getEntityFieldValue = (state,
  { entityType, value, relatedField }) => _.get(state.entity, `${entityType}.${value}.${relatedField}`, null);

const getEntityByName = (state, { entityType }) => state.entity[entityType];

const mapToOptions = (options,
  relatedField) => _.map(options, row => ({ label: row[relatedField], value: row.id }));

export const getEntityMemberById = (state, { entityType, entityId }) => (
  entityId ? state.entity[entityType][entityId] : {});

const filterAndMapFields = (fields, isHidden) => (
  _.chain(fields).values()
    .filter(field => field.hidden === isHidden)
    .sortBy('fieldOrder')
    .value()
);

const mapToArray = object => (object ? Object.values(object) : []);

const getRelatedField = (state, { relatedField }) => relatedField;

const getIdList = (state, { value }) => value;

const filterEntityByIdList = (entity, ids, relatedField) => _.map(
  ids, id => _.get(entity, `${id}.${relatedField}`),
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

export const getEntityArrayByName = createSelector(
  getEntityByName, entity => mapToArray(entity),
);

export const mapEntityToOptions = createSelector(
  getEntityByName,
  getRelatedField,
  mapToOptions,
);

export const getEntityByIdList = createSelector(
  getEntityByName,
  getIdList,
  getRelatedField,
  filterEntityByIdList,
);
