import React from 'react';

import BaseField from './base-field';
import DatePicker from '../inputs/date-picker';

const DateField = (props) => {
  const renderInput = attributes => (
    <DatePicker {...attributes} />
  );

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default DateField;
