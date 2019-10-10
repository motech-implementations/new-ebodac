import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoolCell = ({ value }) => (
  <div className="table-cell-text">
    {
      value
        ? <FontAwesomeIcon icon="check-square" />
        : <FontAwesomeIcon icon="times" />
    }
  </div>
);

export default BoolCell;

BoolCell.propTypes = {
  value: PropTypes.bool,
};

BoolCell.defaultProps = {
  value: null,
};
