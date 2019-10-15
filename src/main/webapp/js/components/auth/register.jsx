import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import renderFormField from '../../utils/form/form-utils';
import {
  TEXT,
  PASSWORD,
} from '../../constants/field-types';
import { registerUser } from '../../actions/index';

const REGISTER_FIELDS = [
  {
    name: 'name', fieldType: TEXT, displayName: 'Name', required: true,
  },
  {
    name: 'username', fieldType: TEXT, displayName: 'Username', required: true,
  },
  {
    name: 'email', fieldType: TEXT, displayName: 'Email', required: true,
  },
  {
    name: 'password', fieldType: PASSWORD, displayName: 'Password', required: true,
  },
  {
    name: 'confirmationPassword', fieldType: PASSWORD, displayName: 'Confirm password', required: true,
  },
];

class Register extends Component {
  onSubmit = (values) => {
    this.props.registerUser({ ...values, enabled: false });
  };

  validate = (values) => {
    const error = {};

    if (!values.name) {
      error.name = 'Please enter your name!';
    }

    if (!values.username) {
      error.username = 'Please enter your username!';
    }

    if (!values.email) {
      error.email = 'Please enter your email!';
    }

    if (values.email) {
      if (!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        error.email = 'Email is format not proper!';
      }
    }

    if (!values.password) {
      error.password = 'Please enter your password!';
    }

    if (values.password) {
      if (values.password.length < 8) {
        error.password = 'Your password must contain at least 8 characters!';
      }
    }

    if (!values.confirmationPassword) {
      error.confirmationPassword = 'Please enter your confirmation password!';
    }

    if (values.password !== values.confirmationPassword) {
      error.password = 'Password confirmation does not match password!';
      error.confirmationPassword = 'Password confirmation does not match password!';
    }

    return error;
  };

  renderSuccess = () => {
    const { registrationMessage, registrationSuccess } = this.props;
    const className = `alert ${registrationSuccess ? 'alert-success' : 'alert-danger'} col-sm-12`;
    if (!_.isEmpty(registrationMessage)) {
      return (
        <div className={className}>
          <strong>{registrationMessage}</strong>
        </div>
      );
    }
    return '';
  };

  render() {
    return (
      <div className="page-container">
        <div className="login-container">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <img className="img-fluid" alt="logo" src="images/EBODAClogo.jpg" />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4 offset-md-4">
              <div className="card">
                <div className="card-header bg-info">
                  <div>Sign In</div>
                </div>
                <div className="card-body">
                  { this.renderSuccess() }
                  <Form
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    render={({ handleSubmit, invalid, form: { reset } }) => (
                      <form
                        onSubmit={(event) => {
                          handleSubmit(event);
                          reset();
                        }}
                      >
                        {_.map(REGISTER_FIELDS, elem => renderFormField(elem))}
                        <div className="input-row text-center">
                          <div className="col-sm-12">
                            <button type="submit" className="btn btn-secondary" disabled={invalid}>Register</button>
                          </div>
                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registrationMessage: state.registrationReducer.registrationMessage,
  registrationSuccess: state.registrationReducer.registrationSuccess,
});

export default connect(mapStateToProps, { registerUser })(Register);

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  registrationMessage: PropTypes.string.isRequired,
  registrationSuccess: PropTypes.bool.isRequired,
};
