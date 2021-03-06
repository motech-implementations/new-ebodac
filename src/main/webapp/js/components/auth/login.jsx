import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signinUser } from '../../actions/auth-actions';

const validate = (values) => {
  const error = {};

  if (!values.username) {
    error.username = 'Enter a username!';
  }

  if (!values.password) {
    error.password = 'Enter a password!';
  }

  return error;
};

class Login extends Component {
  onSubmit = (values) => {
    const { savedLogins } = this.props;
    this.props.signinUser({
      ...values,
      savedLogin: _.get(savedLogins, values.username, null),
    });
  };

  static renderField(field) {
    const {
      placeholder, type, input, icon, meta: { touched, error },
    } = field;
    const inputClassName = `form-control ${touched && error ? 'is-invalid' : ''}`;

    return (
      <div className="input-group margin-bottom-md">
        <div className="input-group-prepend">
          <span className="input-group-text"><FontAwesomeIcon icon={icon} /></span>
        </div>
        <input className={inputClassName} type={type} placeholder={placeholder} {...input} />
        <div className="invalid-feedback">{error}</div>
      </div>
    );
  }

  renderAlert = () => {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger col-sm-12">
          <strong>{errorMessage}</strong>
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <div className="page-container container-fluid">
        <div className="d-flex flex-column align-items-center">
          <div className="login-container mb-2">
            <div>
              <img className="img-fluid" alt="logo" src="images/EBODAClogo.jpg" />
            </div>
            <div className="d-flex flex-column">
              <div className="card">
                <div className="card-header bg-info">
                  <div>Sign In</div>
                </div>
                <div className="card-body">
                  { this.renderAlert() }
                  <Form
                    onSubmit={this.onSubmit}
                    validate={validate}
                    render={({ handleSubmit, invalid }) => (
                      <form onSubmit={handleSubmit}>
                        <div>
                          <Field
                            placeholder="Username"
                            type="text"
                            name="username"
                            icon="user"
                            component={Login.renderField}
                          />
                        </div>
                        <Field
                          placeholder="Password"
                          type="password"
                          name="password"
                          icon="lock"
                          component={Login.renderField}
                        />
                        <div className="d-flex justify-content-center">
                          <button type="submit" className="btn btn-secondary" disabled={invalid}>Login</button>
                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>
              <Link to="/register">
                <FontAwesomeIcon icon="hand-point-right" />
                <span className="icon-text">Create an account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  savedLogins: state.auth.savedLogins,
});

export default connect(mapStateToProps, { signinUser })(Login);

Login.propTypes = {
  errorMessage: PropTypes.string,
  signinUser: PropTypes.func.isRequired,
  savedLogins: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Login.defaultProps = {
  errorMessage: null,
};
