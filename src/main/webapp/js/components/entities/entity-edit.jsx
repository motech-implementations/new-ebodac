import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form } from 'react-final-form';
import { getEntityMemberById } from '../../selectors';
import renderFormField, { validate } from '../../utils/form/form-utils';

class EntityEdit extends Component {
  onSubmit = () => {
  };

  validate = values => validate(this.props.fieldConfig)(values);

  render() {
    const { entityToEdit, fieldConfig } = this.props;
    return (
      <div className="container-fluid">
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={entityToEdit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="modal-fields">
              {_.map(fieldConfig, elem => renderFormField(elem))}
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  entityToEdit: getEntityMemberById(state, props),
});

export default connect(mapStateToProps)(EntityEdit);

EntityEdit.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  entityToEdit: PropTypes.shape({}).isRequired,
};
