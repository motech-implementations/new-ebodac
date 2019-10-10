import _ from 'lodash';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import 'react-table/react-table.css';

import { fetchEntity } from '../../actions';
import { getEntityArrayByName } from '../../selectors';

import getTableColumn from '../../utils/table-utils';

class EntityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.fetchEntity(this.props.entityType);
  }

  render() {
    const { entity, fieldConfig, entityType } = this.props;
    const { loading } = this.state;
    const columns = _.map(fieldConfig, item => getTableColumn(item));
    return (
      <div className="container">
        <div className="row margin-top-sm">
          <div className="col-md-6">
            <h1>{_.startCase(entityType)}</h1>
          </div>
          <div className="col-md-3 ml-auto">
            <button
              type="button"
              className="btn btn-success btn-lg btn-block"
              onClick={() => this.props.history.push(`/create/${entityType}`)}
            >
            Create New
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ReactTable
              data={entity}
              columns={columns}
              loading={loading}
              getTdProps={(state, rowInfo) => ({
                onClick: () => {
                  this.props.history.push(`/entityEdit/${entityType}/${rowInfo.original.id}`);
                },
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  entity: getEntityArrayByName(state, props),
});

export default withRouter(
  connect(mapStateToProps, { fetchEntity })(EntityTable),
);

EntityTable.propTypes = {
  entityType: PropTypes.string.isRequired,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchEntity: PropTypes.func.isRequired,
  entity: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
