import React from 'react';
import PropTypes from 'prop-types';

import BaseField from './base-field';
import Select from '../inputs/select';

const SelectField = (props) => {
  const renderInput = ({ disabled, ...attributes }) => (
    <Select isDisabled={disabled} {...attributes} />
  );

  renderInput.propTypes = {
    disabled: PropTypes.bool.isRequired,
  };

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default SelectField;
