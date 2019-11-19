import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { ClimbingBoxLoader } from 'react-spinners';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

import { getCsvConfigsByEntityType } from '../../selectors';

import apiClient from '../../utils/api-client';

class CsvImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: false,
      filename: '',
      configId: null,
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.fileUpload(this.state.file);
  }

  onFilePickerChange = (e) => {
    const file = e.target.files[0];
    this.setState({ file, filename: file.name });
  }

  onConfigChange = (option) => {
    this.setState({ configId: option.value });
  }

  fileUpload = (file) => {
    this.setState({ loading: true, content: '' });

    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const url = `/import/${this.state.configId}`;

    apiClient.post(url, formData, config)
      .then((response) => {
        let content = `Your upload has been successful! \nThere were ${_.size(response.data)} issue/s with your file: \n`;

        _.map(response.data, (value, key) => {
          content += `CSV row ${key}: ${value} \n`;
        });

        this.setState({ content, loading: false });
      })
      .catch((error) => {
        this.setState({ content: error.response.data.details, loading: false });
      });
  }

  render() {
    const { csvConfigs } = this.props;
    const { entityType } = this.props.match.params;

    return (
      <div className="margin-left-md margin-top-md">
        <h1 className="page-header padding-bottom-xs">
          {`${_.startCase(entityType)} - Import CSV`}
        </h1>
        { !_.isNil(csvConfigs) && (
        <div className="margin-top-md">
          <form className="form-horizontal" onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="col-md-6">
                <ReactSelect
                  options={_.map(csvConfigs,
                    config => ({ value: config.id, label: `${config.name} | last updated ${format(parseISO(config.updateDate), 'yyyy-MM-dd HH:mm:ss')}` }))}
                  onChange={this.onConfigChange}
                  placeholder="Select CSV config"
                />
              </div>
            </div>
            <div className="row padding-bottom-xs">
              <div className="input-group col-md-6">
                <label className="input-group-btn" htmlFor="csvInput">
                  <span className="btn btn-primary">
                    Browse for CSV file
                    {' '}
                    <input
                      id="csvInput"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={this.onFilePickerChange}
                      accept=".csv"
                      className="btn btn-primary"
                    />
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={this.state.filename}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={!this.state.file || !this.state.configId}
                >
                Upload
                </button>
              </div>
            </div>
          </form>
          <h3 className="margin-top-sm">Result</h3>
          <div className="row">
            <div className="offset-md-2">
              <ClimbingBoxLoader
                color="#000000"
                loading={this.state.loading}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 preformatted">
              {this.state.content}
            </div>
          </div>
        </div>
        )}
        {_.isNil(csvConfigs) && (
          <div>
          There is no CSV config for this entity yet!
            Go to CSV config settings to create one.
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  csvConfigs: getCsvConfigsByEntityType(state, { entityType: props.match.params.entityType }),
});

export default withRouter(
  connect(mapStateToProps, { })(CsvImport),
);

CsvImport.propTypes = {
  csvConfigs: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
