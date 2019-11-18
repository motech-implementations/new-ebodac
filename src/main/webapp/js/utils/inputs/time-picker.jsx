import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';

const TimePicker = ({
  onChange, value, timeFormat, ...props
}) => {
  const handleChange = (time) => {
    if (!time || typeof time === 'string') {
      onChange(time);
    } else {
      onChange(format(time, timeFormat));
    }
  };

  return (
    <div className="modal-fields">
      <ReactDatePicker
        className="form-control"
        {...props}
        dateFormat={timeFormat}
        selected={value ? parseISO(`1970-01-01T${value}`) : null}
        placeholderText="Select..."
        showTimeSelect
        showTimeSelectOnly
        timeFormat={timeFormat}
        onChange={handleChange}
        timeIntervals={15}
      />
    </div>
  );
};

export default TimePicker;

TimePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  timeFormat: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
};

TimePicker.defaultProps = {
  value: null,
};
