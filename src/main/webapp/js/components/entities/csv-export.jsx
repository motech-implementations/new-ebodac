import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import { format as formatDate, parseISO } from 'date-fns';

import { getRelatedEntitiesSelector } from '../../selectors';
import {
  DATE, DATE_TIME, ENUM, RELATION,
} from '../../constants/field-types';

class CsvExport extends Component {
  getRelatedValue = (rawRow, fieldConfig) => {
    let relatedValue;
    if (fieldConfig.base) {
      relatedValue = rawRow[fieldConfig.name];
    } else {
      relatedValue = _.get(rawRow, `extraFields.${fieldConfig.name}.value`, null);
    }
    if (_.isNil(relatedValue)) {
      return relatedValue;
    }

    switch (fieldConfig.fieldType) {
      case RELATION:
        relatedValue = _.get(this.props.relatedEntities, `${fieldConfig.relatedEntity}.${rawRow[fieldConfig.name]}.${fieldConfig.relatedField}`, null);
        return relatedValue;
      case ENUM:
        _.forEach(fieldConfig.format.split(','), (val) => {
          const chunks = val.split(':');
          if (chunks[0] === relatedValue && chunks.length > 1) {
            [, relatedValue] = chunks;
          }
        });
        return relatedValue;
      case DATE:
      case DATE_TIME:
        relatedValue = formatDate(parseISO(relatedValue), fieldConfig.format);
        return relatedValue;
      default:
        return relatedValue;
    }
  };

  exportCSV = () => {
    const fieldConfigsSorted = _.sortBy(this.props.fieldConfig, 'fieldOrder');
    const headersSorted = _.map(fieldConfigsSorted, config => (
      config.displayName
    ));

    const dataToExport = _.map(this.props.entity, rawRow => _.map(fieldConfigsSorted,
      fieldConfig => this.getRelatedValue(rawRow, fieldConfig)));

    const csvData = Papa.unparse({
      fields: headersSorted,
      data: dataToExport,
    });

    const blob = new Blob([csvData], { type: 'text/csv' });
    const csvDownloadUrl = window.URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.href = csvDownloadUrl;
    tempLink.setAttribute('download', `${_.startCase(this.props.entityType)}-export.csv`);
    tempLink.click();
  };

  render() {
    return (
      <div className="mx-2 mt-2 mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.exportCSV()}
        >
          Export CSV
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  relatedEntities: getRelatedEntitiesSelector(state, props),
});

export default connect(mapStateToProps, {})(CsvExport);

CsvExport.propTypes = {
  relatedEntities: PropTypes.shape({}),
  entityType: PropTypes.string.isRequired,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  entity: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

CsvExport.defaultProps = {
  relatedEntities: {},
};
