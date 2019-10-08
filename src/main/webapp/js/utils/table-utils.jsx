import PropTypes from 'prop-types';
import React from 'react';

import RelationCell from './table-cells/relation-cell';
import EnumCell from './table-cells/enum-cell';
import DateCell from './table-cells/date-cell';
import CollectionCell from './table-cells/collection-cell';
import TextCell from './table-cells/text-cell';
import BoolCell from './table-cells/bool-cell';
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

const getTableColumn = (props) => {
  const {
    name, displayName, filterable,
  } = props;

  return {
    Header: displayName,
    accessor: name,
    filterable,
    Cell: item => getTableCell(item, props),
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
