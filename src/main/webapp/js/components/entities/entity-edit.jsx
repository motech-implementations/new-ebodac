import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';

import { getEntityMemberById } from '../../selectors';
import renderFormField, { validate } from '../../utils/form/form-utils';
import { updateEntity } from '../../actions/index';

class EntityEdit extends Component {
  onSubmit = (values) => {
    this.props.updateEntity(this.props.entityType, values, () => {
      Alert.success(`${_.startCase(this.props.entityType)} has been updated!`);
      this.props.history.push(`/viewEntity/${this.props.entityType}`);
    });
  };

  validate = values => validate(this.props.fieldConfig)(values);

  render() {
    const { entityToEdit, fieldConfig, entityType } = this.props;
    return (
      <div className="container">
        <div>
          <h1>
            {`Edit ${_.startCase(entityType)}`}
          </h1>
        </div>
        <div>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            initialValues={entityToEdit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="modal-fields">
                <div>
                  {_.map(fieldConfig, elem => renderFormField(elem))}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg margin-top-sm padding-left-lg padding-right-lg"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  entityToEdit: getEntityMemberById(state, props),
});

export default withRouter(
  connect(mapStateToProps, { updateEntity })(EntityEdit),
);

EntityEdit.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateEntity: PropTypes.func.isRequired,
  entityToEdit: PropTypes.shape({}).isRequired,
  entityType: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
