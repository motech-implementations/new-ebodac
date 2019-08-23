import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = ({ onChange, options, ...props }) => {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <ReactSelect
      {...props}
      options={options}
      onChange={handleChange}
    />
  );
};

export default Select;

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string,
    PropTypes.shape({})])).isRequired,
  onChange: PropTypes.func.isRequired,
};
