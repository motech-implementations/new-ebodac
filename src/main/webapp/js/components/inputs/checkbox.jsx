import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  value, onChange, indeterminate, ...props
}) => {
  const handleChange = (event) => {
    const { checked } = event.target;

    onChange(checked);
  };

  return (
    <input
      type="checkbox"
      ref={(elem) => {
        if (elem) {
          // eslint-disable-next-line no-param-reassign
          elem.indeterminate = indeterminate;
        }
      }}
      checked={value || false}
      {...props}
      onChange={handleChange}
    />
  );
};

export default Checkbox;

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
  indeterminate: PropTypes.bool,
};

Checkbox.defaultProps = {
  value: null,
  indeterminate: false,
};
