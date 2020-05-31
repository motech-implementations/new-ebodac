import _ from 'lodash';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';

import { getEntityArrayByName } from '../../selectors';
import { fetchEntity } from '../../actions/entity-actions';
import { enrollVaccinee, unenrollVaccinee } from '../../actions/enrollment-actions';
import { VACCINEE_ENTITY } from '../../constants/entity-types';
import { getEnrollmentStatusName } from '../../constants/enrollment-status';
import TextCell from '../../utils/table-cells/text-cell';
import EnrollmentCell from '../../utils/table-cells/enrollment-cell';

const ALERT_TIMEOUT = 5000;

class VaccineeEnrollment extends Component {
  componentDidMount() {
    this.props.fetchEntity(VACCINEE_ENTITY);
  }

  enroll = (vaccineeId) => {
    this.props.enrollVaccinee(vaccineeId, () => {
      Alert.success('Vaccinee has been successfully enrolled!', {
        timeout: ALERT_TIMEOUT,
      });
    });
  };

  unenroll = (vaccineeId) => {
    this.props.unenrollVaccinee(vaccineeId, () => {
      Alert.success('Vaccinee has been successfully unenrolled!', {
        timeout: ALERT_TIMEOUT,
      });
    });
  };

  getColumns = () => [
    {
      Header: 'Vaccinee Id',
      accessor: 'vaccineeId',
    },
    {
      Header: 'Vaccinee Name',
      accessor: 'name',
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
    const { vaccinees, history } = this.props;

    return (
      <div>
        <h1>Vaccinee enrollment</h1>
        <ReactTable
          data={vaccinees}
          columns={this.getColumns()}
          getTdProps={(state, rowInfo) => ({
            onClick: () => {
              if (_.get(rowInfo, 'original.id')) {
                history.push(`/visitEnrollment/${rowInfo.original.id}`);
              }
            },
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vaccinees: getEntityArrayByName(state, { entityType: VACCINEE_ENTITY }),
});

export default withRouter(
  connect(mapStateToProps, { fetchEntity, enrollVaccinee, unenrollVaccinee })(VaccineeEnrollment),
);

VaccineeEnrollment.propTypes = {
  fetchEntity: PropTypes.func.isRequired,
  enrollVaccinee: PropTypes.func.isRequired,
  unenrollVaccinee: PropTypes.func.isRequired,
  vaccinees: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
