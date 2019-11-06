import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import RelationCell from './table-cells/relation-cell';
import EnumCell from './table-cells/enum-cell';
import DateCell from './table-cells/date-cell';
import CollectionCell from './table-cells/collection-cell';
import TextCell from './table-cells/text-cell';
import BoolCell from './table-cells/bool-cell';
import EnumFilter from './filter/enum-filter';
import TextFilter from './filter/text-filter';
import {
  DATE,
  DATE_TIME,
  RELATION,
  ENUM,
  BOOLEAN,
  COLLECTION,
} from '../constants/field-types';

const getTableCell = (item, props) => {
  const {
    fieldType, format, relatedEntity, relatedField,
  } = props;
  let Cell;
  let attr = {};
  const { value } = item;

  switch (fieldType) {
    case DATE:
      Cell = DateCell;
      attr = { format };
      break;
    case DATE_TIME:
      Cell = DateCell;
      attr = { format };
      break;
    case RELATION:
      Cell = RelationCell;
      attr = { entityType: relatedEntity, relatedField };
      break;
    case ENUM:
      Cell = EnumCell;
      attr = { format };
      break;
    case BOOLEAN:
      Cell = BoolCell;
      break;
    case COLLECTION:
      Cell = CollectionCell;
      attr = { entityType: relatedEntity, relatedField };
      break;
    default:
      Cell = TextCell;
  }
  return (
    <Cell value={value} {...attr} />
  );
};

const getTableFilter = (filter, onChange, format, fieldType) => {
  let Filter;
  switch (fieldType) {
    case ENUM:
      Filter = EnumFilter;
      break;
    default:
      Filter = TextFilter;
  }

  return (
    <Filter filter={filter} onChange={onChange} format={format} />
  );
};

const getTableColumn = (props) => {
  const {
    name, displayName, filterable, format, fieldType,
  } = props;

  return {
    Header: displayName,
    accessor: name,
    filterable,
    Cell: item => getTableCell(item, props),
    filterMethod: (filter, row) => {
      let filterValue = false;
      switch (fieldType) {
        case ENUM:
          if (filter.value === 'ALL') {
            filterValue = true;
          } else {
            filterValue = (row[filter.id] === filter.value);
          }
          break;
        default:
          filterValue = _.toString(row[filter.id]).toLowerCase().includes(
            filter.value.trim().toLowerCase(),
          );
      }
      return filterValue;
    },
    Filter: ({ filter, onChange }) => (
      getTableFilter(filter, onChange, format, fieldType)
    ),
  };
};

export default getTableColumn;

getTableColumn.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  relatedEntity: PropTypes.string,
  relatedField: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  filterable: PropTypes.bool.isRequired,
  format: PropTypes.string,
  entities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

getTableCell.propTypes = {
  fieldType: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  relatedEntity: PropTypes.string.isRequired,
  relatedField: PropTypes.string.isRequired,
};

getTableColumn.defaultProps = {
  format: null,
  relatedEntity: null,
  relatedField: null,
};
