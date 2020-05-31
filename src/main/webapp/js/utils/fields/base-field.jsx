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
    if (config.onChange) {
      config.onChange(value);
    }
    input.onChange(value);
  };

  const onBlur = (value) => {
    props.resetLogoutCounter();
    input.onBlur(value);
  };

  const attr = {
    ...config, disabled: !editable, id: input.name, value: input.value, onChange, onBlur,
  };

  return (
    <div className={`${hidden ? 'd-none' : ''}`}>
      <div className={`d-flex flex-row input-row ${required ? 'required' : ''}  ${touched && error ? 'has-error' : ''}`}>
        { displayName && (
          <span className="col-form-label text-right nebodac-label">
            <label htmlFor={attr.id}>{ displayName }</label>
          </span>
        )}
        <div className="d-flex flex-column">
          <div className="nebodac-input">
            {renderInput(attr)}
          </div>
          <div className="help-block">
            { touched ? error : '' }
          </div>
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
    onChange: PropTypes.func,
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
