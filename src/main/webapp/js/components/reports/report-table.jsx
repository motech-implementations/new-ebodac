import _ from 'lodash';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import 'react-table/react-table.css';

import { fetchEntity } from '../../actions/entity-actions';
import { resetLogoutCounter } from '../../actions/auth-actions';
import { getEntityArrayByName } from '../../selectors';

import getTableColumn from '../../utils/table-utils';
import CsvExport from '../entities/csv-export';
import { COLLECTION, RELATION } from '../../constants/field-types';

class ReportTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchEntityAndRelatedEntities();
  }

  componentDidUpdate(prevProps) {
    if (this.props.entityType !== prevProps.entityType) {
      this.fetchEntityAndRelatedEntities();
    }
  }

  fetchEntityAndRelatedEntities() {
    _.forEach(this.props.fieldConfig, (field) => {
      if (field.fieldType === RELATION || field.fieldType === COLLECTION) {
        this.props.fetchEntity(field.relatedEntity);
      }
    });

    this.props.fetchEntity(this.props.entityType);
  }

  render() {
    const { entity, fieldConfig, entityType } = this.props;
    const { loading } = this.state;
    const columns = _.map(fieldConfig, elem => getTableColumn(elem));

    return (
      <div className="container-fluid">
        <h1>{_.startCase(entityType)}</h1>
        <CsvExport
          entity={entity}
          fieldConfig={fieldConfig}
          entityType={entityType}
        />
        <ReactTable
          data={entity}
          columns={columns}
          loading={loading}
          getTheadFilterThProps={() => (
            { style: { overflow: 'visible' } }
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  entity: getEntityArrayByName(state, props),
});

export default withRouter(
  connect(mapStateToProps, { fetchEntity, resetLogoutCounter })(ReportTable),
);

ReportTable.propTypes = {
  entityType: PropTypes.string.isRequired,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchEntity: PropTypes.func.isRequired,
  entity: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
