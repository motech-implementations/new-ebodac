import React from 'react';
import PropTypes from 'prop-types';
import { ENROLLED, NOT_ENROLLED, UNENROLLED } from '../../constants/enrollment-status';

const EnrollmentCell = ({
  status, entityId, enroll, unenroll,
}) => {
  switch (status) {
    case ENROLLED:
      return (
        <div className="table-cell-text">
          <button
            type="button"
            className="btn btn-danger"
            onClick={(event) => {
              event.stopPropagation();
              unenroll(entityId);
            }}
          >
            Unenroll
          </button>
        </div>
      );
    case UNENROLLED:
    case NOT_ENROLLED:
      return (
        <div className="table-cell-text">
          <button
            type="button"
            className="btn btn-success"
            onClick={(event) => {
              event.stopPropagation();
              enroll(entityId);
            }}
          >
            Enroll
          </button>
        </div>
      );
    default:
      return '';
  }
};

export default EnrollmentCell;

EnrollmentCell.propTypes = {
  enroll: PropTypes.func.isRequired,
  unenroll: PropTypes.func.isRequired,
  status: PropTypes.string,
  entityId: PropTypes.string,
};

EnrollmentCell.defaultProps = {
  status: null,
  entityId: null,
};
