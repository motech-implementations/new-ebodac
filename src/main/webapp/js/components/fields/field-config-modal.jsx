import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import _ from 'lodash';

import ConfirmModal from '../comfirm-modal';
import renderFormField from '../form/form-utils';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
  content: {
    top: '62%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    overflow: 'auto',
  },
};

const FIELD_TYPE_OPTIONS = [
  { label: 'Text', value: 'TEXT' },
  { label: 'Long text', value: 'LONG_TEXT' },
  { label: 'Integer', value: 'INTEGER' },
  { label: 'Float', value: 'FLOAT' },
  { label: 'Boolean', value: 'BOOLEAN' },
  { label: 'Data', value: 'DATE' },
  { label: 'Date time', value: 'DATE_TIME' },
  { label: 'Enum', value: 'ENUM' },
  { label: 'Relation', value: 'RELATION' },
  { label: 'Collection', value: 'COLLECTION' },
  { label: 'Vaccination date', value: 'VACCINATION_DATE' },
];

const ENTITY_TYPE_OPTION = [
  { label: 'Vaccinee', value: 'VACCINEE' },
  { label: 'Visit', value: 'VISIT' },
  { label: 'Site', value: 'SITE' },
  { label: 'Group', value: 'GROUP' },
  { label: 'Person', value: 'PERSON' },
  { label: 'Language', value: 'LANGUAGE' },
  { label: 'Visit type', value: 'VISIT_TYPE' },
];

const FIELDS = [
  {
    name: 'base', fieldType: 'BOOLEAN', displayName: 'Base', required: true,
  },
  {
    name: 'editable', fieldType: 'BOOLEAN', displayName: 'Editable', required: true,
  },
  {
    name: 'filterable', fieldType: 'BOOLEAN', displayName: 'Filterable', required: true,
  },
  {
    name: 'required', fieldType: 'BOOLEAN', displayName: 'Required', required: true,
  },
  {
    name: 'fieldType', fieldType: 'RELATION', displayName: 'Field type', required: true, options: FIELD_TYPE_OPTIONS,
  },
  {
    name: 'entity', fieldType: 'RELATION', displayName: 'Entity', required: true, options: ENTITY_TYPE_OPTION,
  },
  {
    name: 'relatedEntity', fieldType: 'RELATION', displayName: 'Related entity', required: false, options: ENTITY_TYPE_OPTION,
  },
  {
    name: 'displayName', fieldType: 'TEXT', displayName: 'Display name', required: true,
  },
  {
    name: 'name', fieldType: 'TEXT', displayName: 'Name', required: true,
  },
  {
    name: 'format', fieldType: 'TEXT', displayName: 'Format', required: false,
  },
  {
    name: 'relatedField', fieldType: 'TEXT', displayName: 'Related field', required: false,
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
    const { modalType } = this.props;
    if (modalType === 'update') {
      this.props.updateConfig(values);
    } else {
      this.props.createConfig(values);
    }
    this.props.hideModal();
  };

  hideConfirmModal = () => {
    this.setState({ openConfirmModal: false });
  };

  hideConfigModal = () => {
    this.hideConfirmModal();
    this.props.hideModal();
  };

  deleteConfig = () => {
    this.props.deleteConfig(this.props.item, () => this.hideConfigModal());
  };

  validate = (values) => {
    const error = {};
    if (!values.displayName) {
      error.name = 'Enter a display name!';
    }
    return error;
  };

  openConfirmModal = () => {
    this.setState({ openConfirmModal: true });
  };

  displayFields = () => {
    const { openConfirmModal } = this.state;
    const { modalType } = this.props;
    const { base } = this.props.item;
    return (
      <div className="config-modal-form">
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={this.props.item}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} className="modal-fields">
              {_.map(FIELDS, elem => renderFormField(elem))}
              <div>
                <span>
                  <button type="submit" disabled={invalid} className="btn btn-primary">Save</button>
                </span>
                <span style={{ float: 'right' }}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    disabled={base || modalType === 'create'}
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
          modalText="Are you sure to delete Config?"
          onConfirm={this.deleteConfig}
          onHide={this.hideConfirmModal}
        />
      </div>
    );
  };

  render() {
    const { modalIsOpen } = this.props;
    return (
      <div className="container-fluid">
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Field Config"
          onRequestClose={this.props.hideModal}
        >
          <div style={{ display: 'flex' }}>
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
            <h2>Field Config</h2>
          </div>
          {this.displayFields()}
        </Modal>
      </div>
    );
  }
}

export default FieldConfigModal;

FieldConfigModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  createConfig: PropTypes.func.isRequired,
  deleteConfig: PropTypes.func.isRequired,
  updateConfig: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  item: PropTypes.shape({
    base: PropTypes.bool,
    editable: PropTypes.bool,
    filterable: PropTypes.bool,
    required: PropTypes.bool,
    fieldType: PropTypes.string,
    entity: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
    relatedEntity: PropTypes.string,
    relatedField: PropTypes.string,
    format: PropTypes.string,
  }).isRequired,
};
