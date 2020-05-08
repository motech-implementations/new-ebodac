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
      <div className="container-fluid">
        <h1>IVR Provider Config</h1>
        <div className="mx-2 mt-2 mb-3">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.props.history.push('/createIvrProviderConfig')}
            disabled={!this.props.isOnline}
          >
            Create New
          </button>
        </div>
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
