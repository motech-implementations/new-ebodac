import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import 'react-table/react-table.css';
import { getJsonConfigArray } from '../../selectors';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Entity type',
    accessor: 'entity',
  },
];

const JsonConfigTable = props => (
  <div className="container">
    <div className="row margin-top-sm">
      <div className="col-md-6">
        <h1>Json Import Config</h1>
      </div>
      <div className="col-md-3 ml-auto">
        <button
          type="button"
          className="btn btn-success btn-lg btn-block"
          onClick={() => props.history.push('/createJsonConfig')}
          disabled={!props.isOnline}
        >
          Create New
        </button>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <ReactTable
          data={props.jsonConfig}
          columns={columns}
          getTdProps={(state, rowInfo) => ({
            onClick: () => {
              if (_.get(rowInfo, 'original.id')) {
                props.history.push(
                  `/updateJsonConfig/${rowInfo.original.entity}/${rowInfo.original.id}`,
                );
              }
            },
          })}
        />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  jsonConfig: getJsonConfigArray(state),
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps)(JsonConfigTable),
);

JsonConfigTable.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  jsonConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
