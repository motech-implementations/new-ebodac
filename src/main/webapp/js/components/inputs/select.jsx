import _ from 'lodash';
import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = ({
  onChange, options, value, ...props
}) => {
  const handleChange = (val) => {
    if (val) {
      onChange(val.value);
    } else {
      onChange(val);
    }
  };

  const getValue = () => {
    if (!value) {
      return null;
    }

    return _.find(options, option => _.isEqual(option, value));
  };

  return (
    <ReactSelect
      {...props}
      options={options}
      onChange={handleChange}
      value={getValue()}
    />
  );
};

export default Select;

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string,
    PropTypes.shape({})])).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
};

Select.defaultProps = {
  value: null,
};
