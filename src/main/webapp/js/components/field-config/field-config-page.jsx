import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import { getVisibleFields, getHiddenFields } from '../../selectors';
import FieldConfigModal from './field-config-modal';
import {
  changeFieldVisibility, changeFieldOrder, saveFieldConfigOrder,
} from '../../actions/field-config-actions';

const VISIBLE_FIELDS = 'visible';
const HIDDEN_FIELDS = 'hidden';

const LIST_NAMES = {
  [VISIBLE_FIELDS]: 'Visible',
  [HIDDEN_FIELDS]: 'Hidden',
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: '20px',
  boxShadow: '2px 2px 2px 2px #4B4B48',
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class FieldConfigPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedFieldId: null,
    };
  }

  onDragEnd = ({ draggableId, source, destination }) => {
    const { entityType } = this.props.match.params;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      this.props.changeFieldOrder(entityType, {
        id: draggableId,
        oldOrder: source.index,
        newOrder: destination.index,
        hidden: destination.droppableId === HIDDEN_FIELDS,
      });
    } else {
      this.props.changeFieldVisibility(entityType, {
        id: draggableId,
        oldOrder: source.index,
        newOrder: destination.index,
        hidden: destination.droppableId === HIDDEN_FIELDS,
      });
    }
  };

  setConfigToEdit = (item) => {
    this.openModal();
    this.setState({ selectedFieldId: item.id });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  hideModal = () => {
    this.setState({ isModalOpen: false });
  };

  getChangedFields = fields => _.filter(fields, field => field.changed);

  saveConfigs = () => {
    const { entityType } = this.props.match.params;
    const { visibleFields, hiddenFields } = this.props;
    this.props.saveFieldConfigOrder(entityType,
      [...this.getChangedFields(visibleFields), ...this.getChangedFields(hiddenFields)]);
  };

  addConfig = () => {
    this.setState({ selectedFieldId: null });
    this.openModal();
  };

  renderDroppableList = (droppableId, items) => (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {LIST_NAMES[droppableId]}
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}
            >
              {(prov, snap) => (
                <div
                  role="button"
                  tabIndex="0"
                  onClick={() => this.setConfigToEdit(item)}
                  onKeyUp={() => {}}
                  ref={prov.innerRef}
                  {...prov.draggableProps}
                  {...prov.dragHandleProps}
                  style={getItemStyle(
                    snap.isDragging,
                    prov.draggableProps.style,
                  )}
                >
                  {item.displayName}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  render() {
    const { entityType } = this.props.match.params;
    const { visibleFields, hiddenFields, isOnline } = this.props;
    const { isModalOpen, selectedFieldId } = this.state;

    return (
      <div>
        <FieldConfigModal
          modalIsOpen={isModalOpen}
          hideModal={this.hideModal}
          entityType={entityType}
          fieldId={selectedFieldId}
          newItemOrder={visibleFields.length}
        />
        <h1>{_.startCase(entityType)}</h1>
        <div className="d-flex flex-row">
          <div className="mx-2 mt-2 mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.saveConfigs}
              disabled={!isOnline}
            >
              Save
            </button>
          </div>
          <div className="mx-2 mt-2 mb-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.addConfig}
              disabled={!isOnline}
            >
              Add
            </button>
          </div>
        </div>
        <div className="two-coll-dnd">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.renderDroppableList(VISIBLE_FIELDS, visibleFields)}
            {this.renderDroppableList(HIDDEN_FIELDS, hiddenFields)}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  visibleFields: getVisibleFields(state, { entityType: props.match.params.entityType }),
  hiddenFields: getHiddenFields(state, { entityType: props.match.params.entityType }),
  isOnline: state.offline.online,
});

export default connect(mapStateToProps, {
  changeFieldVisibility, changeFieldOrder, saveFieldConfigOrder,
})(FieldConfigPage);

FieldConfigPage.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  changeFieldVisibility: PropTypes.func.isRequired,
  changeFieldOrder: PropTypes.func.isRequired,
  saveFieldConfigOrder: PropTypes.func.isRequired,
  visibleFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hiddenFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string,
    }),
  }).isRequired,
};
