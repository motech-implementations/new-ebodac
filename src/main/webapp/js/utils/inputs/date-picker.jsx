import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';

const DatePicker = ({
  onChange, value, dateFormat, ...props
}) => {
  const handleChange = (date) => {
    onChange(date);
  };

  return (
    <ReactDatePicker
      className="form-control"
      {...props}
      selected={value ? parseISO(value) : null}
      dateFormat={dateFormat}
      onChange={handleChange}
      timeFormat="HH:mm"
      timeIntervals={15}
    />
  );
};

export default DatePicker;

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
};

DatePicker.defaultProps = {
  value: null,
};
