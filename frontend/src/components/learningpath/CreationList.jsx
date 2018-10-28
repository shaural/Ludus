import React, { Component } from 'react';
import AddClassDialog from './SelectClass';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

export default class CreationList extends Component {
  state = { show: false };

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
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <AddClassDialog />
        </Modal>
        <button type="button" onClick={this.showModal}>
          Add Classes...
        </button>
      </div>
    );
  }
}

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
