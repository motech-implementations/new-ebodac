import React from 'react';

import BaseField from './base-field';
import Checkbox from '../inputs/checkbox';

const CheckboxField = (props) => {
  const renderInput = attributes => (
    <Checkbox {...attributes} />
  );

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default CheckboxField;
