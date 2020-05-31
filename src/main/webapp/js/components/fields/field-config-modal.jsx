import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import _ from 'lodash';
import { connect } from 'react-redux';

import ConfirmModal from '../comfirm-modal';
import renderFormField, { validate } from '../../utils/form/form-utils';
import { getFieldConfigById } from '../../selectors';
import {
  createFieldConfig,
  deleteFieldConfig,
  saveFieldConfig,
} from '../../actions/field-config-actions';
import {
  TEXT,
  LONG_TEXT,
  INTEGER,
  FLOAT,
  BOOLEAN,
  DATE,
  DATE_TIME,
  ENUM,
  RELATION,
  COLLECTION,
  VACCINATION_DATE,
} from '../../constants/field-types';

const defaultConfig = {
  base: false,
  editable: true,
  filterable: true,
  required: false,
  hidden: false,
  fieldType: null,
  entity: null,
  displayName: '',
  name: '',
  relatedEntity: null,
  relatedField: null,
  format: '',
  pattern: '',
  uniqueField: false,
};

const FIELD_TYPE_OPTIONS = [
  { label: 'Text', value: TEXT },
  { label: 'Long text', value: LONG_TEXT },
  { label: 'Integer', value: INTEGER },
  { label: 'Float', value: FLOAT },
  { label: 'Boolean', value: BOOLEAN },
  { label: 'Date', value: DATE },
  { label: 'Date time', value: DATE_TIME },
  { label: 'Enum', value: ENUM },
  { label: 'Relation', value: RELATION, isDisabled: true },
  { label: 'Collection', value: COLLECTION, isDisabled: true },
  { label: 'Vaccination date', value: VACCINATION_DATE, isDisabled: true },
];

const FIELDS = [
  {
    name: 'name', fieldType: TEXT, displayName: 'Name', required: true, uniqueField: true,
  },
  {
    name: 'fieldType', fieldType: ENUM, displayName: 'Field type', required: true, options: FIELD_TYPE_OPTIONS,
  },
  {
    name: 'displayName', fieldType: TEXT, displayName: 'Display name', required: true,
  },
  {
    name: 'required', fieldType: BOOLEAN, displayName: 'Required', required: false,
  },
  {
    name: 'editable', fieldType: BOOLEAN, displayName: 'Editable', required: false,
  },
  {
    name: 'filterable', fieldType: BOOLEAN, displayName: 'Filterable', required: false,
  },
  {
    name: 'format', fieldType: TEXT, displayName: 'Format', required: false,
  },
  {
    name: 'uniqueField', fieldType: BOOLEAN, displayName: 'Unique field', required: false,
  },
  {
    name: 'pattern', fieldType: TEXT, displayName: 'Pattern', required: false,
  },
];

class FieldConfigModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openConfirmModal: false,
    };
  }

  onSubmit = (values) => {
    const { fieldId, entityType, newItemOrder } = this.props;

    if (!fieldId) {
      this.props.createFieldConfig(entityType,
        {
          ...values,
          format: _.includes([DATE, DATE_TIME, ENUM, TEXT], values.fieldType)
            ? values.format : undefined,
          pattern: values.fieldType === TEXT ? values.pattern : undefined,
          fieldOrder: newItemOrder,
          entity: entityType,
        });
    } else {
      this.props.saveFieldConfig(entityType, values);
    }

    this.props.hideModal();
  };

  hideConfirmModal = () => {
    this.setState({ openConfirmModal: false });
  };

  deleteConfig = () => {
    const { fieldConfig, entityType } = this.props;

    this.props.deleteFieldConfig(entityType, fieldConfig);
    this.hideConfirmModal();
    this.props.hideModal();
  };

  validate = values => validate(_.map(FIELDS, elem => ({
    ...elem,
    required: (_.includes([DATE, DATE_TIME, ENUM], values.fieldType) && elem.name === 'format') || elem.required,
  })), this.props.fieldConfigs)(values);

  openConfirmModal = () => {
    this.setState({ openConfirmModal: true });
  };

  renderFields = () => {
    const { openConfirmModal } = this.state;
    const { fieldConfig, fieldId, isOnline } = this.props;
    let config = fieldConfig;
    if (!fieldId) {
      config = defaultConfig;
    }

    return (
      <div className="modal-form">
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={config}
          render={({ handleSubmit, invalid, values }) => (
            <form onSubmit={handleSubmit} className="modal-fields">
              {_.map(FIELDS, elem => renderFormField({
                ...elem,
                editable: (elem.name !== 'name' && elem.name !== 'fieldType') || !fieldId,
                hidden: (!_.includes([DATE, DATE_TIME, ENUM, TEXT], values.fieldType) && elem.name === 'format')
                || (values.fieldType !== TEXT && elem.name === 'pattern'),
                required: (_.includes([DATE, DATE_TIME, ENUM], values.fieldType) && elem.name === 'format') || elem.required,
              }))}
              <div>
                <span>
                  <button
                    type="submit"
                    disabled={invalid || !isOnline}
                    className="btn btn-primary mr-1"
                  >
                    Save
                  </button>
                </span>
                <span>
                  <button type="button" onClick={this.props.hideModal} className="btn btn-secondary">Cancel</button>
                </span>
                <span style={{ float: 'right' }}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    disabled={config.base || !fieldId || !isOnline}
                    onClick={this.openConfirmModal}
                  >
                    Delete
                  </button>
                </span>
              </div>
            </form>
          )}
        />
        <ConfirmModal
          showModal={openConfirmModal}
          modalText="Are you sure to delete Config? All related data will be deleted!"
          onConfirm={this.deleteConfig}
          onHide={this.hideConfirmModal}
        />
      </div>
    );
  };

  render() {
    const { modalIsOpen } = this.props;
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          className={{
            base: 'nebodac-confirm-modal',
            afterOpen: 'nebodac-confirm-modal_after-open',
            beforeClose: 'nebodac-confirm-modal_before-close',
          }}
          contentLabel="Field Config"
          onRequestClose={this.props.hideModal}
        >
          <div className="d-flex flex-row align-items-center">
            <div
              style={{ verticalAlign: 'text-top' }}
              className="menu-button change"
              onClick={this.props.hideModal}
              onKeyUp={() => {}}
              role="link"
              tabIndex="0"
            >
              <div className="bar1" style={{ backgroundColor: 'black' }} />
              <div className="bar2" style={{ backgroundColor: 'black' }} />
              <div className="bar3" style={{ backgroundColor: 'black' }} />
            </div>
            <h2 className="mb-0">Field Config</h2>
          </div>
          {this.renderFields()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  fieldConfig: getFieldConfigById(state, props),
  fieldConfigs: state.fieldConfig[props.entityType],
  isOnline: state.offline.online,
});

export default connect(mapStateToProps,
  { saveFieldConfig, deleteFieldConfig, createFieldConfig })(FieldConfigModal);

FieldConfigModal.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  entityType: PropTypes.string.isRequired,
  newItemOrder: PropTypes.number.isRequired,
  createFieldConfig: PropTypes.func.isRequired,
  saveFieldConfig: PropTypes.func.isRequired,
  deleteFieldConfig: PropTypes.func.isRequired,
  fieldId: PropTypes.string,
  fieldConfigs: PropTypes.shape({}).isRequired,
  fieldConfig: PropTypes.shape({}),
};

FieldConfigModal.defaultProps = {
  fieldId: null,
  fieldConfig: null,
};
