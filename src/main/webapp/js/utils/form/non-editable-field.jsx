import React from 'react';
import PropTypes from 'prop-types';

import BaseField from './base-field';

const NonEditableField = (props) => {
  const renderInput = ({ value }) => (
    <span>{value}</span>
  );

  renderInput.propTypes = {
    value: PropTypes.string,
  };

  renderInput.defaultProps = {
    value: '',
  };

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default NonEditableField;
