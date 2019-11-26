import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';

import { signoutUser } from '../actions/auth-actions';

class CounterLogout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: Date.now() + (this.props.counterLogoutTime * 1000),
    };
  }

  componentDidUpdate(prevProps) {
    const { counterLogoutTime, resetCounter } = this.props;
    if (prevProps.resetCounter !== resetCounter) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ date: Date.now() + (counterLogoutTime * 1000) });
    }
  }

  minTwoDigits = (n) => {
    const str = `${n}`;
    return (str.length < 2 ? '0' : '') + str;
  };

  logoutUser = () => {
    this.props.signoutUser();
  };

  renderCountdown = ({ minutes, seconds }) => (
    <div>
      {`${this.minTwoDigits(minutes)}:${this.minTwoDigits(seconds)}`}
    </div>
  );

  render() {
    const { date } = this.state;
    return (
      <div className="counter-logout">
        <span className="counter-text">SESSION EXPIRES IN</span>
        <Countdown
          date={date}
          onComplete={this.logoutUser}
          renderer={this.renderCountdown}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counterLogoutTime: state.auth.counterLogoutTime,
  resetCounter: state.auth.resetCounter,
});

export default connect(mapStateToProps, { signoutUser })(CounterLogout);

CounterLogout.propTypes = {
  counterLogoutTime: PropTypes.number,
  signoutUser: PropTypes.func.isRequired,
  resetCounter: PropTypes.bool.isRequired,
};

CounterLogout.defaultProps = {
  counterLogoutTime: 600,
};
