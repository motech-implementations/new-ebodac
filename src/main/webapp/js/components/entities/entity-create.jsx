import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';

import { createEntity } from '../../actions/entity-actions';
import renderFormField, { validate } from '../../utils/form-utils';

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

  validate = values => validate(this.props.fieldConfig, this.props.entities)(values);

  render() {
    const { fieldConfig, entityType, isOnline } = this.props;
    return (
      <div>
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
                <div className="form-buttons-container">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={!isOnline}
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

const mapStateToProps = (state, props) => ({
  entities: state.entity[props.entityType],
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { createEntity })(EntityCreate),
);

EntityCreate.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  createEntity: PropTypes.func.isRequired,
  entityType: PropTypes.string.isRequired,
  entities: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
