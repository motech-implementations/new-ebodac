import React from 'react';

import BaseField from './base-field';
import Textarea from '../inputs/textarea';

const TextareaField = (props) => {
  const renderInput = attributes => (
    <Textarea {...attributes} />
  );

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default TextareaField;
