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

  canRead = () => {
    const { permissions, entityType } = this.props;
    const permission = `ROLE_${entityType}_READ`;
    return _.includes(permissions, permission);
  };

  canWrite = () => {
    const { permissions, entityType } = this.props;
    const permission = `ROLE_${entityType}_WRITE`;
    return _.includes(permissions, permission);
  };

  render() {
    const {
      entity, fieldConfig, entityType, isOnline,
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
          {this.canRead() && (
          <CsvExport
            entity={entity}
            fieldConfig={fieldConfig}
            entityType={entityType}
          />
          )}
          {this.canWrite() && (
            <div className="col-md-2">
              {!_.isNil(this.props.csvConfigs) && (
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={() => this.props.history.push(`/import/${entityType}`)}
                  disabled={_.isEmpty(this.props.csvConfigs) || !isOnline}
                  title={_.isEmpty(this.props.csvConfigs)
                    ? 'You have to create a CSV config for this entity!' : ''}
                >
                  Import CSV
                </button>
              )}
            </div>
          )}
          {this.canWrite() && (
            <div className="col-md-2 float-right">
              <button
                type="button"
                className="btn btn-success btn-lg btn-block"
                onClick={() => this.props.history.push(`/create/${entityType}`)}
                disabled={!isOnline}
              >
                Create New
              </button>
            </div>
          )}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  permissions: state.auth.permissions,
  entity: getEntityArrayByName(state, props),
  csvConfigs: getCsvConfigsByEntityType(state, { entityType: props.match.params.entityType }),
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
};

EntityTable.defaultProps = {
  csvConfigs: null,
};
