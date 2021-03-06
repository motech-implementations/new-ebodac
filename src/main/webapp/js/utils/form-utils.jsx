import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import TextField from './fields/text-field';
import TextareaField from './fields/textarea-field';
import CheckboxField from './fields/checkbox-field';
import DateField from './fields/date-field';
import TimeField from './fields/time-field';
import SelectField from './fields/select-field';
import NonEditableField from './fields/non-editable-field';
import RelationField from './fields/relation-field';
import {
  TEXT, LONG_TEXT, INTEGER, FLOAT, BOOLEAN, DATE, DATE_TIME,
  ENUM, RELATION, COLLECTION, VACCINATION_DATE, PASSWORD, TIME,
} from '../constants/field-types';

export const getOptionsFromEnum = (format) => {
  if (!format) {
    return [];
  }

  return _.map(format.split(','), (val) => {
    const chunks = val.split(':');

    if (chunks.length > 1) {
      return { value: chunks[0], label: chunks[1] };
    }

    return { value: chunks[0], label: chunks[0] };
  });
};

const renderFormField = (props) => {
  const {
    name, fieldType, displayName, required, editable, hidden,
    format, options = null, relatedEntity, relatedField, onChange,
  } = props;
  let FieldType;
  let attr = {};

  switch (fieldType) {
    case TEXT:
      FieldType = TextField;
      break;
    case PASSWORD:
      FieldType = TextField;
      attr = { type: 'password' };
      break;
    case LONG_TEXT:
      FieldType = TextareaField;
      break;
    case INTEGER:
      FieldType = TextField;
      attr = { type: 'number' };
      break;
    case FLOAT:
      FieldType = TextField;
      attr = { type: 'number' };
      break;
    case BOOLEAN:
      FieldType = CheckboxField;
      break;
    case DATE:
      FieldType = DateField;
      attr = { dateFormat: format };
      break;
    case TIME:
      FieldType = TimeField;
      attr = {
        timeFormat: format, withPortal: true,
      };
      break;
    case DATE_TIME:
      FieldType = DateField;
      attr = { dateFormat: format, showTimeSelect: true };
      break;
    case ENUM:
      FieldType = SelectField;
      attr = { options: options || getOptionsFromEnum(format) };
      break;
    case RELATION:
      FieldType = RelationField;
      attr = { entityType: relatedEntity, relatedField };
      break;
    case COLLECTION:
      FieldType = RelationField;
      attr = { entityType: relatedEntity, relatedField, multi: true };
      break;
    case VACCINATION_DATE:
      FieldType = NonEditableField;
      break;
    default:
      FieldType = NonEditableField;
  }

  return (
    <FieldType
      key={name}
      fieldConfig={{
        name, displayName, required, editable, hidden, onChange, ...attr,
      }}
    />
  );
};

export const validate = (fieldConfig, entities) => (values) => {
  const errors = {};
  _.forEach(fieldConfig, (config) => {
    const val = values[config.name];

    if (config.required && (_.isNil(val) || val === '')) {
      errors[config.name] = `${config.displayName} is required`;
    }
    if (config.uniqueField && !(_.isNil(val) || val === '')) {
      const existingEntity = _.find(
        entities, elem => (elem[config.name] === val && elem.id !== values.id),
      );
      if (existingEntity) {
        errors[config.name] = `${config.displayName} should be unique`;
      }
    }
  });

  return errors;
};

export default renderFormField;

renderFormField.propTypes = {
  name: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  format: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  relatedEntity: PropTypes.string,
  relatedField: PropTypes.string,
  hidden: PropTypes.bool,
  onChange: PropTypes.func,
};

renderFormField.defaultProps = {
  format: null,
  options: null,
  relatedEntity: null,
  relatedField: null,
  hidden: false,
  onChange: null,
};
