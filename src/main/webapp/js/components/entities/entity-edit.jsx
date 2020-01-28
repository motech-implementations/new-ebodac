import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';

import { getEntityMemberById } from '../../selectors';
import renderFormField, { validate } from '../../utils/form/form-utils';
import { updateEntity, deleteEntity } from '../../actions/entity-actions';
import ConfirmModal from '../comfirm-modal';

const ALERT_TIMEOUT = 5000;

class EntityEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openConfirmModal: false,
    };
  }

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
    this.props.updateEntity(entityType, entityValue, () => {
      Alert.success(`${_.startCase(entityType)} has been updated!`, {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push(`/viewEntity/${entityType}`);
    });
  };

  validate = values => validate(
    this.props.fieldConfig,
    this.props.entities,
  )(values);

  openConfirmModal = () => {
    this.setState({ openConfirmModal: true });
  };

  hideConfirmModal = () => {
    this.setState({ openConfirmModal: false });
  };

  deleteEntity = () => {
    const { entityType, entityId } = this.props;
    this.props.deleteEntity(entityType, entityId, () => {
      Alert.success(`${_.startCase(entityType)} has been deleted!`, {
        timeout: ALERT_TIMEOUT,
      });
      this.props.history.push(`/viewEntity/${entityType}`);
    });
  };

  render() {
    const { openConfirmModal } = this.state;
    const {
      entityToEdit, fieldConfig, entityType, isOnline, disableDelete,
    } = this.props;
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
                  {_.map(fieldConfig, elem => renderFormField({ ...elem, name: (elem.base ? elem.name : `extraFields.${elem.name}.value`) }))}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg margin-top-sm padding-left-lg padding-right-lg margin-right-sm"
                    disabled={!isOnline}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg margin-top-sm padding-left-lg padding-right-lg"
                    onClick={this.openConfirmModal}
                    disabled={!isOnline || disableDelete}
                  >
                    Delete
                  </button>
                </div>
              </form>
            )}
          />
        </div>
        <ConfirmModal
          showModal={openConfirmModal}
          modalText="Are you sure to delete this?"
          onConfirm={this.deleteEntity}
          onHide={this.hideConfirmModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  entityToEdit: getEntityMemberById(state, props),
  entities: state.entity[props.entityType],
  isOnline: state.offline.online,
});

export default withRouter(
  connect(mapStateToProps, { updateEntity, deleteEntity })(EntityEdit),
);

EntityEdit.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  disableDelete: PropTypes.bool,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  entityToEdit: PropTypes.shape({}).isRequired,
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  entities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

EntityEdit.defaultProps = {
  disableDelete: false,
};
