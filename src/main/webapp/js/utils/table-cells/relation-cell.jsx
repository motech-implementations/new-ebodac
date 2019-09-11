import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getEntityFieldValue } from '../../selectors';

const RelationCell = props => (
  <div className="table-cell-text">
    {props.entity}
  </div>
);

const mapStateToProps = (state, props) => ({
  entity: getEntityFieldValue(state, props),
});

export default connect(mapStateToProps)(RelationCell);

RelationCell.propTypes = {
  entity: PropTypes.string,
};

RelationCell.defaultProps = {
  entity: null,
};
