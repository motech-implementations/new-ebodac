import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEntity } from '../../actions';
import EntityTable from '../entities/entity-table';
import { ROLE_ENTITY, PERMISSION_ENTITY } from '../../utils/entity-types';
import roleFieldConfig from '../../utils/field-configs';

class Roles extends Component {
  componentDidMount() {
    this.props.fetchEntity(PERMISSION_ENTITY);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>
          Roles
        </h1>
        <EntityTable
          entityType={ROLE_ENTITY}
          fieldConfig={roleFieldConfig}
        />
      </div>
    );
  }
}

export default connect(null, { fetchEntity })(Roles);

Roles.propTypes = {
  fetchEntity: PropTypes.func.isRequired,
};
