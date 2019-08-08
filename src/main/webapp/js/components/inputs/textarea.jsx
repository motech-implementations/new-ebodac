import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ onChange, ...props }) => {
  const handleChange = (event) => {
    const { value } = event.target;

    onChange(value);
  };

  return (
    <textarea
      className="form-control"
      {...props}
      onChange={handleChange}
    />
  );
};

export default Textarea;

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
};
