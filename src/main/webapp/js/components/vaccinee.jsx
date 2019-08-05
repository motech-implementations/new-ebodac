import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-table/react-table.css';

import fetchVaccinees from '../actions/index';

class Vaccinee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.fetchVaccinees(() => this.setState({ loading: false }));
  }

  static getTableColumns() {
    return [{
      Header: 'Name',
      accessor: 'name',
    }, {
      Header: 'Age',
      accessor: 'age',
    }];
  }

  render() {
    const { vaccineeList } = this.props;
    const { loading } = this.state;
    return (
      <div className="container-fluid">
        <ReactTable
          data={vaccineeList}
          columns={Vaccinee.getTableColumns()}
          loading={loading}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    vaccineeList: state.vaccinee.vaccineeList,
  };
}

export default connect(mapStateToProps, { fetchVaccinees })(Vaccinee);

Vaccinee.propTypes = {
  fetchVaccinees: PropTypes.func.isRequired,
  vaccineeList: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};
