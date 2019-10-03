import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getEntityArrayByName } from '../../selectors';

const CollectionCell = ({ entityArray, relatedField }) => {
  const collectionCellValue = JSON.stringify(entityArray[0][relatedField]);
  return (
    <div className="table-cell-text">
      {collectionCellValue}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  entityArray: getEntityArrayByName(state, props),
});

export default connect(mapStateToProps)(CollectionCell);

CollectionCell.propTypes = {
  entityArray: PropTypes.string,
  relatedField: PropTypes.string,
};

CollectionCell.defaultProps = {
  entityArray: null,
  relatedField: null,
};
