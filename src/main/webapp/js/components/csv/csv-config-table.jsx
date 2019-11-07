import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import 'react-table/react-table.css';
import { getCsvConfigArray } from '../../selectors';

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

const CsvConfigTable = props => (
  <div className="container">
    <div className="row margin-top-sm">
      <div className="col-md-6">
        <h1>CSV Import Config</h1>
      </div>
      <div className="col-md-3 ml-auto">
        <button
          type="button"
          className="btn btn-success btn-lg btn-block"
          onClick={() => props.history.push('/createCsvConfig')}
        >
        Create New
        </button>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <ReactTable
          data={props.csvConfig}
          columns={columns}
          getTdProps={(state, rowInfo) => ({
            onClick: () => {
              if (rowInfo.original) {
                props.history.push(
                  `/updateCsvConfig/${rowInfo.original.entity}/${rowInfo.original.id}`,
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
  csvConfig: getCsvConfigArray(state),
});

export default withRouter(
  connect(mapStateToProps)(CsvConfigTable),
);

CsvConfigTable.propTypes = {
  csvConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
