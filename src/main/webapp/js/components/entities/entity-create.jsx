import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';

import { createEntity } from '../../actions/entity-actions';
import renderFormField, { validate } from '../../utils/form/form-utils';

const ALERT_TIMEOUT = 5000;

class EntityCreate extends Component {
  onSubmit = (values) => {
    const { entityType, fieldConfig } = this.props;
    const mappedFieldConfig = _.keyBy(_.values(fieldConfig), 'name');
    const entityValue = {
      ...values,
      extraFields: _.map(
        values.extraFields,
        (extraField, fieldName) => ({
          ...extraField,
          name: fieldName,
          fieldType: mappedFieldConfig[fieldName].fieldType,
        }),
      ),
    };
    this.props.createEntity(entityType, entityValue, () => {
      Alert.success(`${_.startCase(entityType)} has been created!`, {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push(`/viewEntity/${entityType}`);
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
                  {_.map(fieldConfig, elem => renderFormField({
                    ...elem,
                    name: (elem.base ? elem.name : `extraFields.${elem.name}.value`),
                  }))}
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
