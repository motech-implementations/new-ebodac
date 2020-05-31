import React from 'react';
import PropTypes from 'prop-types';

import BaseField from './base-field';
import Select from '../inputs/select';

const SelectField = (props) => {
  const renderInput = ({ disabled, multi = false, ...attributes }) => (
    <Select isDisabled={disabled} isMulti={multi} {...attributes} />
  );

  renderInput.propTypes = {
    disabled: PropTypes.bool.isRequired,
    multi: PropTypes.bool,
  };

  renderInput.defaultProps = {
    multi: false,
  };

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default SelectField;
