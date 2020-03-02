import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';
const DATE_TIME_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss';

const DatePicker = ({
  onChange, value, dateFormat, showTimeSelect, ...props
}) => {
  const formatDate = date => (showTimeSelect ? format(date, DATE_TIME_FORMAT)
    : format(date, DATE_FORMAT));

  const parseDate = val => (showTimeSelect ? parse(val, DATE_TIME_FORMAT, new Date())
    : parse(val, DATE_FORMAT, new Date()));

  const handleChange = (date) => {
    if (!date || typeof date === 'string') {
      onChange(date);
    } else {
      onChange(formatDate(date));
    }
  };

  return (
    <div className="modal-fields">
      <ReactDatePicker
        className="form-control"
        {...props}
        selected={value ? parseDate(value) : null}
        placeholderText="Select..."
        showTimeSelect={showTimeSelect}
        dateFormat={dateFormat}
        onChange={handleChange}
        timeFormat="HH:mm"
        timeIntervals={15}
      />
    </div>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string.isRequired,
  showTimeSelect: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
};

DatePicker.defaultProps = {
  value: null,
  showTimeSelect: false,
};
