import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PhoneCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value = props.value
    };
  }

  render() {
    return (
        <div className="table-cell-text">
            {this.state.value}
        </div>
    );   
  }
};

export default PhoneCell;

PhoneCell.propTypes = {
  value: PropTypes.string,
};

PhoneCell.defaultProps = {
  value: null,
};
