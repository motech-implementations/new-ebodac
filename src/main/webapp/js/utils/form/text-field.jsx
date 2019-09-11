import React from 'react';

import BaseField from './base-field';
import Input from '../inputs/input';

const TextField = (props) => {
  const renderInput = attributes => (
    <Input {...attributes} />
  );

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default TextField;
