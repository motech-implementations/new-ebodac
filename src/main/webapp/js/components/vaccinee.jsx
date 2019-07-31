import React, { Component }  from "react";
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-table/react-table.css'

import { fetchVaccinees } from '../actions/index';

class Vaccinee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  getTableColumns() {
    return [{
      Header: 'Name',
      accessor: 'vaccineeId' // String-based value accessors!
    }, {
      Header: 'Age',
      accessor: 'age'
    }]
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.fetchVaccinees()
    .then(() => this.setState({ loading: false }));
  }

  render() {

    return  <div className="container-fluid">
      <ReactTable
        data={this.props.vaccineeList}
        columns={this.getTableColumns()}
        loading={this.state.loading}
      />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    vaccineeList: state.vaccineReducer.vaccineeList
  };
};

export default connect(mapStateToProps, { fetchVaccinees })(Vaccinee);

Vaccinee.propTypes = {
  vaccineeList: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired
};