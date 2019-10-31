import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, format } from 'date-fns';

const DatePicker = ({
  onChange, value, dateFormat, showTimeSelect, ...props
}) => {
  const handleChange = (date) => {
    if (!date || typeof date === 'string') {
      onChange(date);
    } else {
      onChange(showTimeSelect ? date.toISOString() : format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="modal-fields">
      <ReactDatePicker
        className="form-control"
        {...props}
        selected={value ? parseISO(value) : null}
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
