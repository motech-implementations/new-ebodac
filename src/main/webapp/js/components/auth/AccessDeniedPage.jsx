import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const AccessDeniedPage = props => (
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
            <div className="card-header bg-danger">
              <div>You do not have permissions to access this site.</div>
            </div>
            <button className="btn btn-secondary" type="button" onClick={() => props.history.push('/')}>
              Go back to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(AccessDeniedPage);

AccessDeniedPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
