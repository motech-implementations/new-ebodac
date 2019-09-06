export const VACCINEE_ENTITY = 'vaccinee';
export const VISIT_ENTITY = 'visit';
export const SITE_ENTITY = 'site';
export const KEY_COMMUNITY_PERSON_ENTITY = 'keyCommunityPerson';
export const GROUP_ENTITY = 'group';
export const LANGUAGE_ENTITY = 'language';
export const VISIT_TYPE_ENTITY = 'visitType';

const ENTITY_TYPES = {
  [VACCINEE_ENTITY]: 'VACCINEE',
  [VISIT_ENTITY]: 'VISIT',
  [SITE_ENTITY]: 'SITE',
  [KEY_COMMUNITY_PERSON_ENTITY]: 'PERSON',
  [GROUP_ENTITY]: 'GROUP',
  [LANGUAGE_ENTITY]: 'LANGUAGE',
  [VISIT_TYPE_ENTITY]: 'VISIT_TYPE',
};

export const getEntityTypeName = entity => ENTITY_TYPES[entity];
