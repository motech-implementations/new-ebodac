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
      if (field.fieldType === 'RELATION') {
        this.props.fetchEntity(field.relatedEntity);
      }
    });

    this.props.fetchEntity(this.props.entityType);
  }

  render() {
    const {
      entity, fieldConfig, entityType,
    } = this.props;
    const { loading } = this.state;
    const columns = _.map(
      fieldConfig,
      elem => getTableColumn({
        ...elem,
        name: (elem.base ? elem.name : `extraFields.${elem.name}.value`),
      }),
    );

    return (
      <div className="container">
        <div className="row margin-top-sm">
          <div className="col-md-6">
            <h1>{_.startCase(entityType)}</h1>
          </div>
          <CsvExport
            entity={entity}
            fieldConfig={fieldConfig}
            entityType={entityType}
          />
        </div>
        <div className="row">
          <div className="col-md-12">
            <ReactTable
              data={entity}
              columns={columns}
              loading={loading}
              getTheadFilterThProps={() => (
                { style: { overflow: 'visible' } }
              )}
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
  connect(mapStateToProps, { fetchEntity, resetLogoutCounter })(ReportTable),
);

ReportTable.propTypes = {
  entityType: PropTypes.string.isRequired,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchEntity: PropTypes.func.isRequired,
  entity: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
