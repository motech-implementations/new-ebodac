import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import Countdown from 'react-countdown-now';

import { signoutUser } from '../actions/index';

class CounterLogout extends Component {
  static minTwoDigits(n) {
    const str = `${n}`;
    return (str.length < 2 ? '0' : '') + str;
  }

  logoutUser = () => {
    this.props.signoutUser();
  };

  static renderCountdown({ minutes, seconds }) {
    return (
      <div>
        {`${CounterLogout.minTwoDigits(minutes)}:${CounterLogout.minTwoDigits(seconds)}`}
      </div>
    );
  }

  render() {
    const { counterLogoutTime } = this.props;
    return (
      <div className="counter-logout">
        <span className="counter-text">SESSION EXPIRES IN</span>
        <Countdown
          date={Date.now() + ((counterLogoutTime * 1000))}
          onComplete={this.logoutUser}
          renderer={CounterLogout.renderCountdown}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counterLogoutTime: state.auth.counterLogoutTime,
    resetCounter: state.auth.resetCounter,
  };
}

export default connect(mapStateToProps, { signoutUser })(CounterLogout);

CounterLogout.propTypes = {
  counterLogoutTime: PropTypes.number,
  signoutUser: PropTypes.func.isRequired,
};

CounterLogout.defaultProps = {
  counterLogoutTime: 600,
};
