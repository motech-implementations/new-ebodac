import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ENROLLED, NOT_ENROLLED, UNENROLLED } from '../../constants/enrollment-status';

const EnrollmentCell = ({
  status, entityId, enroll, unenroll, isOnline,
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
            disabled={!isOnline}
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
            disabled={!isOnline}
          >
            Enroll
          </button>
        </div>
      );
    default:
      return '';
  }
};

const mapStateToProps = state => ({
  isOnline: state.offline.online,
});

export default connect(mapStateToProps)(EnrollmentCell);

EnrollmentCell.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  enroll: PropTypes.func.isRequired,
  unenroll: PropTypes.func.isRequired,
  status: PropTypes.string,
  entityId: PropTypes.string,
};

EnrollmentCell.defaultProps = {
  status: null,
  entityId: null,
};
