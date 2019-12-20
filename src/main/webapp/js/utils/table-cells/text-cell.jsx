import React from 'react';
import PropTypes from 'prop-types';

const TextCell = ({ value, format, pattern }) => (
  <div className="table-cell-text">
    {(!format || !pattern || !value) ? value : value.replace(new RegExp(pattern, 'i'), format).trim()}
  </div>
);

export default TextCell;

TextCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  format: PropTypes.string,
  pattern: PropTypes.string,
};

TextCell.defaultProps = {
  value: null,
  format: null,
  pattern: null,
};
