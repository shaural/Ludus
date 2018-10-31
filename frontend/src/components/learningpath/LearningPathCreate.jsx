import React, { Component } from 'react';
import CreationList from './CreationList';
import SelectClass from './SelectClass';

export default class LearningPathCreate extends Component {
  state = { show: false, classes: [] };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="lpcontainer">
        {' '}
        <CreationList classIDs={this.state.classes} />
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <SelectClass />
        </Modal>
        <button type="button" onClick={this.showModal}>
          Add Classes...
        </button>
      </div>
    );
  }

  //list of classes chosen so far
  handleRemovePeople(e) {
    var array = [...this.state.classes, e.target.value];
    this.setState({ classes: array });
  }

  handleRemovePeople(e) {
    var array = [...this.state.classes];
    var index = array.indexOf(e.target.value);
    array.splice(index, 1);
    this.setState({ classes: array });
  }
}
//list of classes to choose from
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>Add</button>{' '}
        <button onClick={handleClose}>Back</button>
      </section>
    </div>
  );
};
