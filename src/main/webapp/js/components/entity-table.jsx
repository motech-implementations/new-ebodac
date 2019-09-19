import _ from 'lodash';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import 'react-table/react-table.css';

import { fetchEntity, fetchFieldConfig } from '../actions/index';
import { getVisibleFields, getEntityArrayByName } from '../selectors';
import { LANGUAGE_ENTITY, GROUP_ENTITY } from '../utils/entity-types';

import getTableColumn from '../utils/table-utils';

class EntityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.fetchEntity(LANGUAGE_ENTITY); // temporary solution until sync is done
    // assumption is that at this point all entities are available
    this.props.fetchEntity(GROUP_ENTITY);
    this.props.fetchEntity(this.props.entityType);
    this.props.fetchFieldConfig(this.props.entityType);
  }

  render() {
    const { entity, fieldConfigsColumns, entityType } = this.props;
    const { loading } = this.state;
    const columns = _.map(fieldConfigsColumns, item => getTableColumn(item));
    return (
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
    );
  }
}

const mapStateToProps = (state, props) => ({
  entity: getEntityArrayByName(state, props),
  fieldConfigsColumns: getVisibleFields(state, props),
});

export default withRouter(
  connect(mapStateToProps, { fetchEntity, fetchFieldConfig })(EntityTable),
);

EntityTable.propTypes = {
  entityType: PropTypes.string.isRequired,
  fetchEntity: PropTypes.func.isRequired,
  fetchFieldConfig: PropTypes.func.isRequired,
  entity: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fieldConfigsColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
