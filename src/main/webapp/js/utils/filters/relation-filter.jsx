import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../inputs/select';
import { mapEntityToOptions } from '../../selectors';

const RelationFilter = ({ filter, onChange, entityOptions }) => (
  <Select
    onChange={onChange}
    value={filter ? filter.value : null}
    options={entityOptions}
    isMulti
  />
);

const mapStateToProps = (state, props) => ({
  entityOptions: mapEntityToOptions(state, props),
});

export default connect(mapStateToProps)(RelationFilter);

RelationFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    value: PropTypes.any,
  }),
  entityOptions: PropTypes.arrayOf(PropTypes.shape({})),
};

RelationFilter.defaultProps = {
  filter: null,
  entityOptions: null,
};
