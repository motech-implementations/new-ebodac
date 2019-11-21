import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const EnumCell = ({ value, format }) => {
  const renderValue = () => {
    let enumValue = value;
    if (format) {
      _.forEach(format.split(','), (val) => {
        const chunks = val.split(':');
        if (chunks[0] === value && chunks.length > 1) {
          [, enumValue] = chunks;
        }
      });
    }
    return enumValue;
  };

  return (
    <div className="table-cell-text">
      {renderValue()}
    </div>
  );
};

export default EnumCell;

EnumCell.propTypes = {
  value: PropTypes.string,
  format: PropTypes.string.isRequired,
};

EnumCell.defaultProps = {
  value: null,
};
