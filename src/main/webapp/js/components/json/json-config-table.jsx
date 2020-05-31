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
  <div>
    <h1>Json Import Config</h1>
    <div className="mx-2 mt-2 mb-3">
      <button
        type="button"
        className="btn btn-success"
        onClick={() => props.history.push('/createJsonConfig')}
        disabled={!props.isOnline}
      >
        Create New
      </button>
    </div>
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
