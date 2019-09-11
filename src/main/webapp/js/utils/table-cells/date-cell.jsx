import React from 'react';
import PropTypes from 'prop-types';
import { format as formatDate, parseISO } from 'date-fns';

const DateCell = ({ value, format }) => (
  <div className="table-cell-text">
    {formatDate(parseISO(value), format)}
  </div>
);

export default DateCell;

DateCell.propTypes = {
  value: PropTypes.string,
  format: PropTypes.string.isRequired,
};

DateCell.defaultProps = {
  value: null,
};
