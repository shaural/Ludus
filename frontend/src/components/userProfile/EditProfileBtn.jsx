import React, { Component } from 'react';
import UserEdit from './UserEdit';
import './UserInfoContainer.css';
import './followbtn.css';

class EditProfileBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
        <button class="editButton" onClick={this.showModal}>
          Edit
        </button>

        <Modal show={this.state.show} handleClose={this.hideModal}>
          <UserEdit />
        </Modal>
      </main>
    );
  }
}
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <br />
        <button onClick={handleClose}>Back</button>
      </section>
    </div>
  );
};

export default EditProfileBtn;
