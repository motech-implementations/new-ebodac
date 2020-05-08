import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

class ConfirmModal extends Component {
  hideConfirmModal = () => {
    this.props.onHide();
  };

  confirmModal = () => {
    this.props.onHide();
    this.props.onConfirm();
  };

  render() {
    return (
      <div>
        <Modal
          className={{
            base: 'nebodac-confirm-modal',
            afterOpen: 'nebodac-confirm-modal_after-open',
            beforeClose: 'nebodac-confirm-modal_before-close',
          }}
          isOpen={this.props.showModal}
          onRequestClose={this.props.onHide}
          contentLabel="Modal"
          ariaHideApp={false}
        >
          <h3>{this.props.modalText}</h3>
          <div className="buttons-container padding-top-sm">
            <button
              type="submit"
              className="btn btn-primary margin-bottom-md"
              onClick={this.confirmModal}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary margin-left-sm margin-bottom-md"
              onClick={this.hideConfirmModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ConfirmModal;

ConfirmModal.propTypes = {
  showModal: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  modalText: PropTypes.string,
};

ConfirmModal.defaultProps = {
  showModal: false,
  modalText: '',
};
