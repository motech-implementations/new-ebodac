import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import RelationCell from './table-cells/relation-cell';
import EnumCell from './table-cells/enum-cell';
import DateCell from './table-cells/date-cell';
import CollectionCell from './table-cells/collection-cell';
import TextCell from './table-cells/text-cell';
import BoolCell from './table-cells/bool-cell';
import EnumFilter from './filters/enum-filter';
import TextFilter from './filters/text-filter';
import RelationFilter from './filters/relation-filter';
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
    fieldType, format, pattern, relatedEntity, relatedField,
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
      attr = { format, pattern };
  }
  return (
    <Cell value={value} {...attr} />
  );
};

const getTableFilter = (filter, onChange, format, fieldType, relatedEntity, relatedField) => {
  let Filter;
  switch (fieldType) {
    case ENUM:
      Filter = EnumFilter;
      break;
    case RELATION:
      Filter = RelationFilter;
      break;
    default:
      Filter = TextFilter;
  }

  return (
    <Filter
      filter={filter}
      onChange={onChange}
      format={format}
      entityType={relatedEntity}
      relatedField={relatedField}
    />
  );
};

const getTableColumn = (props) => {
  const {
    name, base, displayName, filterable, format, fieldType, relatedEntity, relatedField,
  } = props;

  return {
    Header: displayName,
    accessor: (base ? name : `extraFields.${name}.value`),
    filterable,
    Cell: item => getTableCell(item, props),
    filterMethod: (filter, row) => {
      switch (fieldType) {
        case ENUM:
          if (filter.value === 'ALL') {
            return true;
          }

          return (row[filter.id] === filter.value);
        case RELATION:
          return (_.isEmpty(filter.value) || row[filter.id] === filter.value
            || _.includes(filter.value, row[filter.id]));
        default:
          return _.toString(row[filter.id]).toLowerCase().includes(
            filter.value.trim().toLowerCase(),
          );
      }
    },
    Filter: ({ filter, onChange }) => (
      getTableFilter(filter, onChange, format, fieldType, relatedEntity, relatedField)
    ),
  };
};

export default getTableColumn;

getTableColumn.propTypes = {
  name: PropTypes.string.isRequired,
  base: PropTypes.bool.isRequired,
  displayName: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  relatedEntity: PropTypes.string,
  relatedField: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  filterable: PropTypes.bool.isRequired,
  format: PropTypes.string,
  pattern: PropTypes.string,
  entities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

getTableCell.propTypes = {
  fieldType: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  relatedEntity: PropTypes.string.isRequired,
  relatedField: PropTypes.string.isRequired,
};

getTableColumn.defaultProps = {
  format: null,
  pattern: null,
  relatedEntity: null,
  relatedField: null,
};
