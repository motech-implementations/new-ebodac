import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import { getVisibleFields, getHiddenFields } from '../../selectors';
import FieldConfigModal from './field-config-modal';
import { fetchFieldConfig, changeFieldVisibility, changeFieldOrder } from '../../actions';

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

    this.props.fetchFieldConfig(props.entityType);
  }

  onDragEnd = ({ draggableId, source, destination }) => {
    const { entityType } = this.props;

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

  saveConfigs = () => {
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
    const { entityType, visibleFields, hiddenFields } = this.props;
    const { isModalOpen, selectedFieldId } = this.state;
    return (
      <div className="container-fluid">
        <FieldConfigModal
          modalIsOpen={isModalOpen}
          hideModal={this.hideModal}
          entityType={entityType}
          fieldId={selectedFieldId}
          newItemOrder={visibleFields.length}
        />
        <div>
          <button type="button" className="btn btn-primary" onClick={this.saveConfigs}>Save</button>
          <button type="button" className="btn btn-success" onClick={this.addConfig} style={{ marginLeft: '20px' }}>Add</button>
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
  visibleFields: getVisibleFields(state, props),
  hiddenFields: getHiddenFields(state, props),
});

export default connect(mapStateToProps,
  { fetchFieldConfig, changeFieldVisibility, changeFieldOrder })(FieldConfigPage);

FieldConfigPage.propTypes = {
  entityType: PropTypes.string.isRequired,
  fetchFieldConfig: PropTypes.func.isRequired,
  changeFieldVisibility: PropTypes.func.isRequired,
  changeFieldOrder: PropTypes.func.isRequired,
  visibleFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hiddenFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
