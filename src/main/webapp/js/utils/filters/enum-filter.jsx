import React from 'react';
import PropTypes from 'prop-types';
import { getOptionsFromEnum } from '../form-utils';
import Select from '../inputs/select';

const EnumFilter = (props) => {
  const { filter, onChange, format } = props;
  const optionLabels = getOptionsFromEnum(format);
  optionLabels.push({ value: 'ALL', label: 'All' });

  return (
    <Select
      onChange={onChange}
      options={optionLabels}
      value={filter ? filter.value : 'ALL'}
    />
  );
};

export default EnumFilter;

EnumFilter.propTypes = {
  filter: PropTypes.shape(),
  onChange: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
};

EnumFilter.defaultProps = {
  filter: null,
};
