import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import 'react-table/react-table.css';
import { fetchAllIvrProviderConfigs } from '../../actions/ivr-provider-config-actions';

const columns = [
  {
    Header: 'Provider Name',
    accessor: 'providerName',
  },
];

class IvrProviderConfigTable extends Component {
  componentDidMount() {
    this.props.fetchAllIvrProviderConfigs();
  }

  render() {
    return (
      <div className="container">
        <div className="row margin-top-sm">
          <div className="col-md-6">
            <h1>IVR Provider Config</h1>
          </div>
          <div className="col-md-3 ml-auto">
            <button
              type="button"
              className="btn btn-success btn-lg btn-block"
              onClick={() => this.props.history.push('/createIvrProviderConfig')}
              disabled={!this.props.isOnline}
            >
              Create New
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ReactTable
              data={_.values(this.props.ivrProviderConfigs)}
              columns={columns}
              getTdProps={(state, rowInfo) => ({
                onClick: () => {
                  if (_.get(rowInfo, 'original.id')) {
                    this.props.history.push(
                      `/updateIvrProviderConfig/${rowInfo.original.id}`,
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
  ivrProviderConfigs: state.ivrProviderConfig.ivrProviderConfigs,
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { fetchAllIvrProviderConfigs })(IvrProviderConfigTable),
);

IvrProviderConfigTable.propTypes = {
  fetchAllIvrProviderConfigs: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
  ivrProviderConfigs: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
