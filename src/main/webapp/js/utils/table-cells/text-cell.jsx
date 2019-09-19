import React from 'react';
import PropTypes from 'prop-types';

const TextCell = ({ value }) => (
  <div className="table-cell-text">
    {value}
  </div>
);

export default TextCell;

TextCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

TextCell.defaultProps = {
  value: null,
};
