import {
  ROLE_ENTITY,
  PERMISSION_ENTITY,
  LANGUAGE_ENTITY,
  CAMPAIGN_MESSAGE_ENTITY,
  VISIT_TYPE_ENTITY,
  USER_ENTITY,
} from './entity-types';

import {
  TEXT,
  COLLECTION,
  INTEGER,
  RELATION,
  ENUM,
  BOOLEAN,
  DATE_TIME,
} from './field-types';

export const roleFieldConfig = [{
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: TEXT,
  entity: ROLE_ENTITY,
  displayName: 'ID',
  name: 'id',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TEXT,
  entity: ROLE_ENTITY,
  displayName: 'Name',
  name: 'name',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: COLLECTION,
  entity: ROLE_ENTITY,
  displayName: 'Permissions',
  name: 'permissionIds',
  fieldOrder: 1,
  relatedEntity: PERMISSION_ENTITY,
  relatedField: 'displayName',
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Create Date',
  name: 'createDate',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Update Date',
  name: 'updateDate',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
},
];

export const userFieldConfig = [{
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: TEXT,
  entity: USER_ENTITY,
  displayName: 'ID',
  name: 'id',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TEXT,
  entity: USER_ENTITY,
  displayName: 'Name',
  name: 'name',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: TEXT,
  entity: USER_ENTITY,
  displayName: 'Username',
  name: 'username',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: TEXT,
  entity: USER_ENTITY,
  displayName: 'e-mail',
  name: 'email',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: BOOLEAN,
  entity: USER_ENTITY,
  displayName: 'Enabled',
  name: 'enabled',
  fieldOrder: 3,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: COLLECTION,
  entity: USER_ENTITY,
  displayName: 'Roles',
  name: 'roleIds',
  fieldOrder: 4,
  relatedEntity: ROLE_ENTITY,
  relatedField: 'name',
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Create Date',
  name: 'createDate',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Update Date',
  name: 'updateDate',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
},
];

export const visitTypeFieldConfig = [{
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: TEXT,
  entity: VISIT_TYPE_ENTITY,
  displayName: 'ID',
  name: 'id',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TEXT,
  entity: VISIT_TYPE_ENTITY,
  displayName: 'Name',
  name: 'name',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TEXT,
  entity: VISIT_TYPE_ENTITY,
  displayName: 'Display Name',
  name: 'displayName',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: ENUM,
  entity: VISIT_TYPE_ENTITY,
  displayName: 'Category',
  name: 'category',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'VACCINATION:Vaccination,FOLLOW_UP:Follow up,UNSCHEDULED:Unscheduled',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: INTEGER,
  entity: VISIT_TYPE_ENTITY,
  displayName: 'Time Offset',
  name: 'timeOffset',
  fieldOrder: 3,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: INTEGER,
  entity: VISIT_TYPE_ENTITY,
  displayName: 'Earliest Time Offset',
  name: 'earliestOffset',
  fieldOrder: 4,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: INTEGER,
  entity: VISIT_TYPE_ENTITY,
  displayName: 'Latest Time Offset',
  name: 'latestOffset',
  fieldOrder: 5,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: COLLECTION,
  entity: VISIT_TYPE_ENTITY,
  displayName: 'Messages',
  name: 'messageIds',
  fieldOrder: 6,
  relatedEntity: CAMPAIGN_MESSAGE_ENTITY,
  relatedField: 'name',
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Create Date',
  name: 'createDate',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Update Date',
  name: 'updateDate',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
},
];

export const languageFieldConfig = [{
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: TEXT,
  entity: LANGUAGE_ENTITY,
  displayName: 'ID',
  name: 'id',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TEXT,
  entity: LANGUAGE_ENTITY,
  displayName: 'Name',
  name: 'name',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TEXT,
  entity: LANGUAGE_ENTITY,
  displayName: 'Code',
  name: 'code',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Create Date',
  name: 'createDate',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Update Date',
  name: 'updateDate',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
},
];

export const campaignMessageFieldConfig = [{
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: TEXT,
  entity: CAMPAIGN_MESSAGE_ENTITY,
  displayName: 'ID',
  name: 'id',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TEXT,
  entity: CAMPAIGN_MESSAGE_ENTITY,
  displayName: 'Name',
  name: 'name',
  fieldOrder: 0,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: TEXT,
  entity: CAMPAIGN_MESSAGE_ENTITY,
  displayName: 'Message Key',
  name: 'messageKey',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: INTEGER,
  entity: CAMPAIGN_MESSAGE_ENTITY,
  displayName: 'Time Offset',
  name: 'timeOffset',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: true,
  hidden: false,
  fieldType: RELATION,
  entity: CAMPAIGN_MESSAGE_ENTITY,
  displayName: 'Visit Type',
  name: 'visitTypeId',
  fieldOrder: 3,
  relatedEntity: VISIT_TYPE_ENTITY,
  relatedField: 'displayName',
  format: '',
}, {
  base: true,
  editable: true,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: BOOLEAN,
  entity: CAMPAIGN_MESSAGE_ENTITY,
  displayName: 'Send For Actual Date',
  name: 'sendForActualDate',
  fieldOrder: 4,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Create Date',
  name: 'createDate',
  fieldOrder: 1,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: true,
  fieldType: DATE_TIME,
  entity: ROLE_ENTITY,
  displayName: 'Update Date',
  name: 'updateDate',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm:ss',
},
];
