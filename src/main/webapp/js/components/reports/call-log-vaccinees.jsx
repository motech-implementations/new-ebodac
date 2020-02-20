import React from 'react';
import ReportTable from './report-table';
import { VACCINEE_CALL_STATUS_REPORT, VACCINEE_ENTITY } from '../../constants/entity-types';
import {
  DATE_TIME, ENUM, FLOAT, INTEGER, RELATION, TEXT,
} from '../../constants/field-types';

const fieldConfig = [{
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: RELATION,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'Vaccinee Id',
  name: 'receiver',
  fieldOrder: 0,
  relatedEntity: VACCINEE_ENTITY,
  relatedField: 'vaccineeId',
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: RELATION,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'Phone',
  name: 'receiver',
  fieldOrder: 1,
  relatedEntity: VACCINEE_ENTITY,
  relatedField: 'phoneNumber',
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: TEXT,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'Message Id',
  name: 'messageKey',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: DATE_TIME,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'Sent Date',
  name: 'sendDate',
  fieldOrder: 3,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: FLOAT,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'Expected Duration',
  name: 'expectedDuration',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: FLOAT,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'Time Listened To',
  name: 'callDuration',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: FLOAT,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'Percent Listened',
  name: 'messagePercentListened',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: DATE_TIME,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'Received Date',
  name: 'receivedDate',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: INTEGER,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'No. of Attempts',
  name: 'numberOfAttempts',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: '',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: ENUM,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'SMS',
  name: 'smsStatus',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'NO:No,YES:Yes,FAIL:Fail',
}, {
  base: true,
  editable: false,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: DATE_TIME,
  entity: VACCINEE_CALL_STATUS_REPORT,
  displayName: 'SMS Received Date',
  name: 'smsReceivedDate',
  fieldOrder: 2,
  relatedEntity: null,
  relatedField: null,
  format: 'yyyy-MM-dd HH:mm',
}];

const CallLogVaccinees = () => (
  <ReportTable entityType={VACCINEE_CALL_STATUS_REPORT} fieldConfig={fieldConfig} />
);

export default CallLogVaccinees;
