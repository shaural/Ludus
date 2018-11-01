import React, { Component } from 'react';
import CreationList from './CreationList';
import SelectClass from './SelectClass';
const Axios = require('axios');
var querystring = require('querystring');

export default class LearningPathCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', topic: '', classes: ['0'] };
    this.submitLP = this.submitLP.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        Learning Path Name:&nbsp;
        <input
          className="inLine"
          type="text"
          onChange={event => this.setState({ name: event.target.value })}
        />
        <br /> <br />
        Topic:&nbsp;
        {'\t\t'}
        <input
          className="inLine"
          type="text"
          onChange={event => this.setState({ topic: event.target.value })}
        />
        <div className="lpcontainer">
          {' '}
          <CreationList
            classIDs={this.state.classes}
            callback={this.handleRemoveClass}
          />
          <Modal show={this.state.show} handleClose={this.hideModal.bind()}>
            <SelectClass callback={this.handleAddClass} />
          </Modal>
          <button type="button" onClick={this.showModal}>
            Add Classes...
          </button>
        </div>
        <button onClick={this.submitLP}>Publish</button>
      </div>
    );
  }

  //list of classes chosen so far
  handleAddClass = event => {
    var array = [...this.state.classes, event.target.value];
    this.setState({ classes: array });
  };

  handleRemoveClass = event => {
    var array = [...this.state.classes];
    var index = array.indexOf(event.target.value);
    array.splice(index, 1);
    this.setState({ classes: array });
  };

  submitLP() {
    /*
    if (!this.state.classes) {
      alert('No Classes in LP!');
    }*/
    const requestBody = {
      name: this.state.name,
      topic: this.state.topic
    };
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    Axios.post(
      `https://us-central1-ludusfire.cloudfunctions.net/${
        this.props.userID /*userid*/
      }/teacher/learningPath`,
      querystring.stringify(requestBody),
      config
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    alert('Published Learning Path!');

    return false;
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
