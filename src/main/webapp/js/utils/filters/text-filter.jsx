import React from 'react';
import PropTypes from 'prop-types';
import Input from '../inputs/input';

const TextFilter = (props) => {
  const { filter, onChange } = props;
  return (
    <Input
      onChange={onChange}
      value={filter ? filter.value : ''}
    />
  );
};

export default TextFilter;

TextFilter.propTypes = {
  filter: PropTypes.shape(),
  onChange: PropTypes.func.isRequired,
};

TextFilter.defaultProps = {
  filter: null,
};
