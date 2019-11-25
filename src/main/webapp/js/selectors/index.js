import _ from 'lodash';
import { createSelector } from 'reselect';
import { VACCINEE_ENTITY, VISIT_ENTITY, VISIT_TYPE_ENTITY } from '../constants/entity-types';

export const getFieldConfigByEntity = (state, { entityType }) => (
  state.fieldConfig[entityType]
);

export const getCsvConfigById = (state, { entity, csvConfigId }) => (
  csvConfigId ? state.csvConfig[entity][csvConfigId] : {}
);

export const getCsvConfigsByEntityType = (state, { entityType }) => (
  entityType ? state.csvConfig[entityType] : {}
);

export const getCsvConfigArray = (state => (
  _.chain(state.csvConfig)
    .omit(state.csvConfig, ['csvConfigFetching', 'csvConfigFetched'])
    .reduce((accumulator, currentValue) => accumulator
      .concat(Object.values(currentValue)), []).value()
));

export const getJsonConfigById = (state, { entity, jsonConfigId }) => (
  jsonConfigId ? state.jsonConfig[entity][jsonConfigId] : {}
);

export const getJsonConfigsByEntityType = (state, { entityType }) => (
  entityType ? state.jsonConfig[entityType] : {}
);

export const getJsonConfigArray = (state => (
  _.chain(state.jsonConfig)
    .omit(state.jsonConfig, ['jsonConfigFetching', 'jsonConfigFetched'])
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

const getVisits = state => state.entity[VISIT_ENTITY];

const getVisitTypes = state => state.entity[VISIT_TYPE_ENTITY];

const getVaccinee = (state, { vaccineeId }) => _.get(state, `entity.${VACCINEE_ENTITY}.${vaccineeId}`);

const filterVisits = (visits, visitTypes, vaccinee) => (
  _.chain(visits).values()
    .filter(visit => visit.vaccinee === _.get(vaccinee, 'id'))
    .map(visit => ({
      ...visit,
      type: visitTypes[visit.type],
      vaccinee,
    }))
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

export const getVisitsByVaccineeId = createSelector(
  getVisits,
  getVisitTypes,
  getVaccinee,
  filterVisits,
);
