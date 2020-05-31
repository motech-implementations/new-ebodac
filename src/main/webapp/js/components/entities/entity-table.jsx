import _ from 'lodash';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import 'react-table/react-table.css';

import { fetchEntity } from '../../actions/entity-actions';
import { resetLogoutCounter } from '../../actions/auth-actions';
import { getCsvConfigsByEntityType, getEntityArrayByName } from '../../selectors';

import getTableColumn from '../../utils/table-utils';
import CsvExport from './csv-export';
import { COLLECTION, RELATION } from '../../constants/field-types';
import { getEntityReadPermission, getEntityWritePermission } from '../../utils/permission-helper';

class EntityTable extends Component {
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

  canRead = (entityType) => {
    const { permissions } = this.props;
    const permission = getEntityReadPermission(entityType);
    return _.includes(permissions, permission);
  };

  canWrite = () => {
    const { permissions, entityType } = this.props;
    const permission = getEntityWritePermission(entityType);
    return _.includes(permissions, permission);
  };

  fetchEntityAndRelatedEntities() {
    _.forEach(this.props.fieldConfig, (field) => {
      if ((field.fieldType === RELATION || field.fieldType === COLLECTION)
        && this.canRead(field.relatedEntity)) {
        this.props.fetchEntity(field.relatedEntity);
      }
    });

    this.props.fetchEntity(this.props.entityType);
  }

  render() {
    const {
      entity, fieldConfig, entityType, isOnline, disableExport,
    } = this.props;
    const { loading } = this.state;
    const columns = _.map(fieldConfig, elem => getTableColumn(elem));

    return (
      <div>
        <h1>{_.startCase(entityType)}</h1>
        <div className="d-flex flex-row">
          {this.canWrite() && (
            <div className="mx-2 mt-2 mb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.props.resetLogoutCounter();
                  this.props.history.push(`/create/${entityType}`);
                }}
                disabled={!isOnline}
              >
                Create New
              </button>
            </div>
          )}
          {this.canWrite() && !_.isNil(this.props.csvConfigs) && (
            <div className="mx-2 mt-2 mb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.props.resetLogoutCounter();
                  this.props.history.push(`/import/${entityType}`);
                }}
                disabled={_.isEmpty(this.props.csvConfigs) || !isOnline}
                title={_.isEmpty(this.props.csvConfigs)
                  ? 'You have to create a CSV config for this entity!' : ''}
              >
                Import CSV
              </button>
            </div>
          )}
          {!disableExport && (
            <CsvExport
              entity={entity}
              fieldConfig={fieldConfig}
              entityType={entityType}
            />
          )}
        </div>
        <ReactTable
          data={entity}
          columns={columns}
          loading={loading}
          getTheadFilterThProps={() => (
            { style: { overflow: 'visible' } }
          )}
          getTdProps={(state, rowInfo) => ({
            onClick: () => {
              if (_.get(rowInfo, 'original.id') && this.canWrite()) {
                this.props.resetLogoutCounter();
                this.props.history.push(`/entityEdit/${entityType}/${rowInfo.original.id}`);
              }
            },
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  permissions: state.auth.permissions,
  entity: getEntityArrayByName(state, props),
  csvConfigs: getCsvConfigsByEntityType(state, { entityType: props.entityType }),
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { fetchEntity, resetLogoutCounter })(EntityTable),
);

EntityTable.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  entityType: PropTypes.string.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchEntity: PropTypes.func.isRequired,
  resetLogoutCounter: PropTypes.func.isRequired,
  entity: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  csvConfigs: PropTypes.shape({}),
  disableExport: PropTypes.bool,
};

EntityTable.defaultProps = {
  csvConfigs: null,
  disableExport: false,
};
