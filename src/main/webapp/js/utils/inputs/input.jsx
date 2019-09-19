import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ onChange, ...props }) => {
  const handleChange = (event) => {
    const { value } = event.target;

    onChange(value);
  };

  return (
    <input
      type="text"
      className="form-control"
      {...props}
      onChange={handleChange}
    />
  );
};

export default Input;

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
};
