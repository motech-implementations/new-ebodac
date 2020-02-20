import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import 'react-table/react-table.css';
import { fetchAllCallConfigs } from '../../actions/call-config-actions';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
];

class CallConfigTable extends Component {
  componentDidMount() {
    this.props.fetchAllCallConfigs();
  }

  render() {
    return (
      <div className="container">
        <div className="row margin-top-sm">
          <div className="col-md-6">
            <h1>IVR Call Config</h1>
          </div>
          <div className="col-md-3 ml-auto">
            <button
              type="button"
              className="btn btn-success btn-lg btn-block"
              onClick={() => this.props.history.push('/createCallConfig')}
              disabled={!this.props.isOnline}
            >
              Create New
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ReactTable
              data={_.values(this.props.callConfigs)}
              columns={columns}
              getTdProps={(state, rowInfo) => ({
                onClick: () => {
                  if (_.get(rowInfo, 'original.id')) {
                    this.props.history.push(
                      `/updateCallConfig/${rowInfo.original.id}`,
                    );
                  }
                },
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  callConfigs: state.callConfig.callConfigs,
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { fetchAllCallConfigs })(CallConfigTable),
);

CallConfigTable.propTypes = {
  fetchAllCallConfigs: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
  callConfigs: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
