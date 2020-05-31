import React from 'react';
import PropTypes from 'prop-types';

import BaseField from './base-field';
import Checkbox from '../inputs/checkbox';

const CheckboxField = (props) => {
  const renderInput = ({ value, ...attributes }) => (
    <Checkbox {...attributes} value={!!value} />
  );

  renderInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  };

  renderInput.defaultProps = {
    value: false,
  };

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default CheckboxField;
