import React from 'react';

import BaseField from './base-field';
import TimePicker from '../inputs/time-picker';

const TimeField = (props) => {
  const renderInput = attributes => (
    <TimePicker {...attributes} />
  );

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default TimeField;
