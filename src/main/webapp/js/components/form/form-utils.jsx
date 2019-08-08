import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import TextField from './text-field';
import TextareaField from './textarea-field';
import CheckboxField from './checkbox-field';
import DatePicker from '../inputs/date-picker';
import SelectField from './select-field';
import NonEditableField from './non-editable-field';

const getOptionsFromEnum = (format) => {
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
    name, fieldType, displayName, required, format, options,
  } = props;

  let FieldType;
  let attr = {};

  switch (fieldType) {
    case 'TEXT':
      FieldType = TextField;
      break;
    case 'LONG_TEXT':
      FieldType = TextareaField;
      break;
    case 'INTEGER':
      FieldType = TextField;
      break;
    case 'FLOAT':
      FieldType = TextField;
      break;
    case 'BOOLEAN':
      FieldType = CheckboxField;
      break;
    case 'DATE':
      FieldType = DatePicker;
      attr = { dateFormat: format };
      break;
    case 'DATE_TIME':
      FieldType = DatePicker;
      attr = { dateFormat: format, showTimeSelect: true };
      break;
    case 'ENUM':
      FieldType = SelectField;
      attr = { options: getOptionsFromEnum(format) };
      break;
    case 'RELATION':
      FieldType = SelectField;
      attr = { options };
      break;
    case 'VACCINATION_DATE':
      FieldType = NonEditableField;
      break;
    default:
      FieldType = NonEditableField;
  }

  return (
    <FieldType
      key={props.name}
      fieldConfig={{
        name, displayName, required, ...attr,
      }}
    />
  );
};

export default renderFormField;

renderFormField.propTypes = {
  name: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  format: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})),
};

renderFormField.defaultProps = {
  format: null,
  options: [],
};
