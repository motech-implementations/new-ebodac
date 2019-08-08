import React from 'react';

import BaseField from './base-field';
import Select from '../inputs/select';

const SelectField = (props) => {
  const renderInput = attributes => (
    <Select {...attributes} />
  );

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default SelectField;
