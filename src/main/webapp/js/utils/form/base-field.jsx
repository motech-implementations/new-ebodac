import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { connect } from 'react-redux';

import { resetLogoutCounter } from '../../actions/auth-actions';

const renderField = ({
  renderInput, fieldConfig: {
    required, hidden, editable = true, displayName, ...config
  }, input, meta: { touched, error }, ...props
}) => {
  const onChange = (value) => {
    input.onChange(value);
  };

  const onBlur = (value) => {
    props.resetLogoutCounter();
    input.onBlur(value);
  };

  const attr = {
    ...config, disabled: !editable, id: input.name, value: input.value, onChange, onBlur,
  };

  const className = `input-row ${required ? 'required' : ''} ${hidden ? 'd-none' : ''} ${touched && error ? 'has-error' : ''}`;

  return (
    <div className={className}>
      <div>
        <span className="col-md-2 col-form-label"><label htmlFor={attr.id}>{ displayName }</label></span>
        <span className="col-md-4">
          {renderInput(attr)}
        </span>
      </div>
      <div>
        <div className="col-md-2" />
        <div className="help-block col-md-4" style={{ float: 'left' }}>
          { touched ? error : '' }
        </div>
      </div>
    </div>
  );
};

const BaseField = ({ fieldConfig: { name, ...config }, renderInput, ...props }) => (
  <Field
    name={name}
    component={renderField}
    renderInput={renderInput}
    fieldConfig={config}
    resetLogoutCounter={props.resetLogoutCounter}
  />
);

export default connect(null, { resetLogoutCounter })(BaseField);

renderField.propTypes = {
  renderInput: PropTypes.func.isRequired,
  fieldConfig: PropTypes.shape({
    displayName: PropTypes.string,
    required: PropTypes.bool,
    editable: PropTypes.bool,
    hidden: PropTypes.bool,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.any,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  resetLogoutCounter: PropTypes.func.isRequired,
};

BaseField.propTypes = {
  fieldConfig: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  renderInput: PropTypes.func.isRequired,
  resetLogoutCounter: PropTypes.func.isRequired,
};
