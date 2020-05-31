import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mapEntityToOptions } from '../../selectors';
import SelectField from './select-field';

const RelationField = ({ fieldConfig, entityOptions }) => (
  <SelectField
    key={fieldConfig.name}
    fieldConfig={{ ...fieldConfig, options: entityOptions }}
  />
);

const mapStateToProps = (state, props) => {
  const { entityType, relatedField } = props.fieldConfig;
  return {
    entityOptions: mapEntityToOptions(state, { entityType, relatedField }),
  };
};

export default connect(mapStateToProps)(RelationField);

RelationField.propTypes = {
  entityOptions: PropTypes.arrayOf(PropTypes.shape({})),
  fieldConfig: PropTypes.shape({
    relatedField: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

RelationField.defaultProps = {
  entityOptions: null,
};
