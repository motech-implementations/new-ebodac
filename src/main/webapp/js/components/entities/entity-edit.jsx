import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import { getVisibleFields, getEntityMemberById } from '../../selectors';
import renderFormField from '../../utils/form/form-utils';

class EntityEdit extends Component {
  componentDidMount() {
  }

  onSubmit = () => {
  };

  validate = () => {
  };

  render() {
    const { entityToEdit, entityToEditConfig } = this.props;
    return (
      <div className="container-fluid">
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={entityToEdit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="modal-fields">
              {_.map(entityToEditConfig, elem => renderFormField(elem))}
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  entityToEdit: getEntityMemberById(state, {
    entityType: props.match.params.entityType,
    id: props.match.params.id,
  }),
  entityToEditConfig: getVisibleFields(state, { entityType: props.match.params.entityType }),
});

export default connect(mapStateToProps)(EntityEdit);

EntityEdit.propTypes = {
  entityToEdit: PropTypes.shape({}).isRequired,
  entityToEditConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
};
