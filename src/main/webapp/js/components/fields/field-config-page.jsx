import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import _ from 'lodash';

import FieldConfigModal from './field-config-modal';

const defaultItem = {
  base: false,
  editable: false,
  filterable: false,
  required: false,
  hidden: false,
  fieldType: '',
  entity: '',
  displayName: '',
  name: '',
  relatedEntity: '',
  relatedField: '',
  format: '',
};

const reorder = (list, startIndex, endIndex) => {
  const listClone = Array.from(list);
  const [removed] = listClone.splice(startIndex, 1);
  return update(listClone, { $splice: [[endIndex, 0, removed]] });
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const [removed] = source.splice(droppableSource.index, 1);
  const destClone = update(destination, { $splice: [[droppableDestination.index, 0, removed]] });
  return update({}, {
    $merge: {
      [droppableSource.droppableId]: source,
      [droppableDestination.droppableId]: destClone,
    },
  });
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
      visible: [],
      hidden: [],
      isModalOpen: false,
      currentItem: defaultItem,
      modalType: 'update',
    };
    this.id2List = {
      visible: 'visible',
      hidden: 'hidden',
    };
    this.props.fetchFieldConfig(() => {
      const { fieldConfigs } = this.props;
      this.mapFieldsToDnDItem(fieldConfigs);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.fieldConfigs !== prevProps.fieldConfigs) {
      const { fieldConfigs } = this.props;
      this.mapFieldsToDnDItem(fieldConfigs);
    }
  }

  setFieldOrder = () => {
    const { visible, hidden } = this.state;
    visible.forEach((item, index) => {
      const field = this.getItemFromId(item.id);
      field.fieldOrder = index;
      field.hidden = false;
    });
    hidden.forEach((item) => {
      const field = this.getItemFromId(item.id);
      field.fieldOrder = 9999;
      field.hidden = true;
    });
  };

  mapFieldsToDnDItem = (fieldConfigs) => {
    const visible = [];
    const hidden = [];

    fieldConfigs.forEach((item) => {
      if (!item.hidden) {
        visible.push({ id: item.id, content: item.displayName, fieldOrder: item.fieldOrder });
      } else {
        hidden.push({ id: item.id, content: item.displayName, fieldOrder: item.fieldOrder });
      }
    });
    visible.sort((a, b) => a.fieldOrder - b.fieldOrder);
    this.setState({ visible, hidden });
  };

  getItemFromId = (id) => {
    const { fieldConfigs } = this.props;
    return fieldConfigs.find(element => element.id === id);
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index,
      );

      const newState = { items };

      newState[source.droppableId] = items;

      this.setState(newState);
    } else {
      const movementResult = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );

      this.setState({
        visible: movementResult.visible,
        hidden: movementResult.hidden,
      });
    }
  };

  setConfigToEdit = (item) => {
    const editFieldConfig = this.getItemFromId(item.id);
    this.openModal();
    this.setState({ currentItem: editFieldConfig, modalType: 'update' });
  };

  editConfig = (config) => {
    const { currentItem } = this.state;
    Object.assign(currentItem, config);
    this.setState({ currentItem });
    const { fieldConfigs } = this.props;
    this.mapFieldsToDnDItem(fieldConfigs);
  };

  deleteConfig = (config, callback) => {
    this.props.deleteFieldConfig(config, () => {
      callback();
      const { fieldConfigs } = this.props;
      this.mapFieldsToDnDItem(fieldConfigs);
    });
  };

  createConfig = (config) => {
    const newConfig = { ...config };
    newConfig.hidden = true;
    newConfig.fieldOrder = 9999;
    this.props.createFieldConfig(newConfig);
    const { fieldConfigs } = this.props;
    this.mapFieldsToDnDItem(fieldConfigs);
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  hideModal = () => {
    this.setState({ isModalOpen: false });
  };

  saveConfigs = () => {
    this.setFieldOrder();
    const { fieldConfigs } = this.props;
    _.forEach(fieldConfigs, (item) => {
      this.props.saveFieldConfig(item);
    });
    this.mapFieldsToDnDItem(fieldConfigs);
  };

  addConfig = () => {
    this.setState({ modalType: 'create', currentItem: defaultItem });
    this.openModal();
  };

  render() {
    const { isModalOpen, currentItem, modalType } = this.state;
    return (
      <div className="container-fluid">
        <FieldConfigModal
          modalIsOpen={isModalOpen}
          hideModal={this.hideModal}
          updateConfig={this.editConfig}
          deleteConfig={this.deleteConfig}
          createConfig={this.createConfig}
          modalType={modalType}
          item={currentItem}
        />
        <div>
          <button type="submit" className="btn btn-primary" onClick={this.saveConfigs}>Save</button>
          <button type="submit" className="btn btn-success" onClick={this.addConfig} style={{ marginLeft: '20px' }}>Add</button>
        </div>
        <div className="two-coll-dnd">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="visible">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  Visible
                  {this.state.visible.map((item, index) => (
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
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="hidden">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  Hidden
                  {this.state.hidden.map((item, index) => (
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
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default FieldConfigPage;

FieldConfigPage.propTypes = {
  fetchFieldConfig: PropTypes.func.isRequired,
  createFieldConfig: PropTypes.func.isRequired,
  saveFieldConfig: PropTypes.func.isRequired,
  deleteFieldConfig: PropTypes.func.isRequired,
  fieldConfigs: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};
