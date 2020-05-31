import _ from 'lodash';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';

import { getVisitsByVaccineeId } from '../../selectors';
import { fetchEntity } from '../../actions/entity-actions';
import { enrollVisit, unenrollVisit } from '../../actions/enrollment-actions';
import { VISIT_ENTITY } from '../../constants/entity-types';
import { getEnrollmentStatusName } from '../../constants/enrollment-status';
import DateCell from '../../utils/table-cells/date-cell';
import TextCell from '../../utils/table-cells/text-cell';
import EnrollmentCell from '../../utils/table-cells/enrollment-cell';

const ALERT_TIMEOUT = 5000;

class VisitEnrollment extends Component {
  componentDidMount() {
    this.props.fetchEntity(VISIT_ENTITY);
  }

  enroll = (vaccineeId) => {
    this.props.enrollVisit(vaccineeId, () => {
      Alert.success('Visit has been successfully enrolled!', {
        timeout: ALERT_TIMEOUT,
      });
    });
  };

  unenroll = (vaccineeId) => {
    this.props.unenrollVisit(vaccineeId, () => {
      Alert.success('Visit has been successfully unenrolled!', {
        timeout: ALERT_TIMEOUT,
      });
    });
  };

  getColumns = () => [
    {
      Header: 'Vaccinee Id',
      accessor: 'vaccinee.vaccineeId',
    },
    {
      Header: 'Visit type',
      accessor: 'type.displayName',
    },
    {
      Header: 'Actual Date',
      accessor: 'date',
      Cell: cell => (<DateCell value={cell.value} format="yyyy-MM-dd" />),
    },
    {
      Header: 'Planned Date',
      accessor: 'plannedDate',
      Cell: cell => (<DateCell value={cell.value} format="yyyy-MM-dd" />),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: cell => (<TextCell value={getEnrollmentStatusName(cell.value)} />),
    },
    {
      Header: 'Action',
      accessor: 'status',
      Cell: cell => (
        <EnrollmentCell
          status={cell.value}
          entityId={_.get(cell, 'original.id')}
          enroll={this.enroll}
          unenroll={this.unenroll}
        />
      ),
    },
  ];

  render() {
    const { visits } = this.props;

    return (
      <div>
        <div className="row margin-top-sm">
          <div className="col-md-6">
            <h1>Visit enrollment</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ReactTable
              data={visits}
              columns={this.getColumns()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  visits: getVisitsByVaccineeId(state, { vaccineeId: props.match.params.id }),
});

export default withRouter(
  connect(mapStateToProps, { fetchEntity, enrollVisit, unenrollVisit })(VisitEnrollment),
);

VisitEnrollment.propTypes = {
  fetchEntity: PropTypes.func.isRequired,
  enrollVisit: PropTypes.func.isRequired,
  unenrollVisit: PropTypes.func.isRequired,
  visits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
