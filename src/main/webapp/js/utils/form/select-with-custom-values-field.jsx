import _ from 'lodash';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import BaseField from './base-field';
import Select from '../inputs/select';
import Input from '../inputs/input';

const OTHER_VALUE = 'OTHER_VALUE';

const customSelectStyle = {
  option: (styles, { data }) => ({ ...styles, opacity: data.value === OTHER_VALUE ? 0.5 : 1 }),
};

class SelectWithCustomValues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderSelect: !props.value || !!_.find(props.options, val => val.value === props.value),
      focusInput: false,
    };
  }

  onChange = (val) => {
    if (val === OTHER_VALUE) {
      this.setState({ renderSelect: false, focusInput: true });
      this.props.onChange(null);
    } else {
      this.props.onChange(val);
    }
  };

  showSelect = () => {
    this.setState({ renderSelect: true });
    this.props.onChange(null);
  };

  render() {
    const { disabled, options, ...attributes } = this.props;

    if (this.state.renderSelect) {
      return (
        <Select
          {...attributes}
          isDisabled={disabled}
          options={[...options, { value: OTHER_VALUE, label: 'Other value...' }]}
          onChange={this.onChange}
          styles={customSelectStyle}
        />
      );
    }

    return (
      <div className="input-group" style={{ backgroundColor: 'white', borderRadius: '.25rem' }}>
        <Input {...attributes} onChange={this.onChange} autoFocus={this.state.focusInput} />
        <div className="input-group-append">
          <button type="button" className="btn btn-outline-danger" onClick={this.showSelect}>
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
      </div>
    );
  }
}

SelectWithCustomValues.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string,
    PropTypes.shape({})])).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
};

SelectWithCustomValues.defaultProps = {
  value: null,
};

const SelectWithCustomValuesField = (props) => {
  const renderInput = attr => (
    <SelectWithCustomValues {...attr} />
  );

  return (
    <BaseField
      {...props}
      renderInput={renderInput}
    />
  );
};

export default SelectWithCustomValuesField;
