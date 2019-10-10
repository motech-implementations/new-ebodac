import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';

import { createEntity } from '../../actions';
import renderFormField, { validate } from '../../utils/form/form-utils';

class EntityCreate extends Component {
  onSubmit = (values) => {
    this.props.createEntity(this.props.entityType, values, () => {
      Alert.success(`${_.startCase(this.props.entityType)} has been created!`);
      this.props.history.push(`/viewEntity/${this.props.entityType}`);
    });
  };

  validate = values => validate(this.props.fieldConfig)(values);

  render() {
    const { fieldConfig, entityType } = this.props;
    return (
      <div className="container">
        <div>
          <h1>
            {`Create ${_.startCase(entityType)}`}
          </h1>
        </div>
        <div>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
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
                    Create
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

export default withRouter(
  connect(null, { createEntity })(EntityCreate),
);

EntityCreate.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  createEntity: PropTypes.func.isRequired,
  entityType: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
