import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const renderField = ({
  renderInput, fieldConfig: { required, displayName, ...config }, input, meta: { touched, error },
}) => {
  const onChange = (value) => {
    input.onChange(value);
  };

  const attr = {
    ...config, id: input.name, value: input.value, onChange,
  };

  const className = `form-group ${required ? 'required' : ''} ${touched && error ? 'has-error' : ''}`;
  return (
    <div className={`mt-2 ${className}`}>
      <div className="row">
        <label htmlFor={attr.id} className="col-md-2 col-form-label">{ displayName }</label>
        <div className="col-md-4">
          {renderInput(attr)}
        </div>
      </div>
      <div className="row">
        <div className="col-md-2" />
        <div className="help-block col-md-4" style={{ float: 'left' }}>
          { touched ? error : '' }
        </div>
      </div>
    </div>
  );
};

const BaseField = ({ fieldConfig: { name, ...config }, renderInput }) => (
  <Field
    name={name}
    component={renderField}
    renderInput={renderInput}
    fieldConfig={config}
  />
);

export default BaseField;

renderField.propTypes = {
  renderInput: PropTypes.func.isRequired,
  fieldConfig: PropTypes.shape({
    displayName: PropTypes.string,
    required: PropTypes.bool,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

BaseField.propTypes = {
  fieldConfig: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  renderInput: PropTypes.func.isRequired,
};
