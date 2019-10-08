import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mapEntityToList } from '../../selectors';

const CollectionCell = ({ values }) => {
  const collectionCellValue = _.join(values, ', ');
  return (
    <div className="table-cell-text">
      {collectionCellValue}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  values: mapEntityToList(state, props),
});

export default connect(mapStateToProps)(CollectionCell);

CollectionCell.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string),
};

CollectionCell.defaultProps = {
  values: null,
};
