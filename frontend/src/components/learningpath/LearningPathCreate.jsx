import React, { Component } from 'react';
import CreationList from './CreationList';
import AddList from './AddList';
import '../class/ClassList.css';
const Axios = require('axios');
var querystring = require('querystring');

export default class LearningPathCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      topic: '',
      mature: 'no',
      classes: [],
      classArray: []
    };
    this.handleAddClass = this.handleAddClass.bind(this);
    this.handleRemoveClass = this.handleRemoveClass.bind(this);
    this.submitLP = this.submitLP.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleMatureCheck = event => {
    if (event.target.checked) {
      this.setState({ mature: 'yes' });
    } else {
      this.setState({ mature: 'no' });
    }
  };

  render() {
    return (
      <div>
        <form className="inputs">
          Learning Path Name:&nbsp;
          <input
            className="long"
            type="text"
            onChange={event => this.setState({ name: event.target.value })}
          />
          <br /> <br />
          Topic:&nbsp;
          {'\t\t'}
          <input
            className="long"
            type="text"
            onChange={event => this.setState({ topic: event.target.value })}
          />
          <br /> <br />
          Mature Content&nbsp;
          {'\t\t'}
          <input
            className="check"
            type="checkbox"
            onChange={event => this.handleMatureCheck(event)}
          />
        </form>
        <div className="lpcontainer">
          {' '}
          <CreationList
            classIDs={this.state.classes}
            classArray={this.state.classArray}
            callback={this.handleRemoveClass}
          />
          <Modal show={this.state.show} handleClose={this.hideModal.bind()}>
            <AddList callback={this.handleAddClass} />
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
  handleAddClass(classID, classy) {
    if (!this.state.classes);
    else {
      if (this.state.classes.indexOf(classID) != -1) {
        alert('That class is already in the learning path!');
        return;
      }
    }
    var idArray = [...this.state.classes, classID];
    var classArray = [...this.state.classArray, classy];
    this.setState({ classes: idArray, classArray: classArray });
  }

  handleRemoveClass(event) {
    console.log(event);
    var idArray = [...this.state.classes];
    var classArray = [...this.state.classArray];
    var index = idArray.indexOf(event);
    idArray.splice(index, 1);
    classArray.splice(index, 1);
    this.setState({ classes: idArray, classArray: classArray });
  }

  submitLP() {
    /*
    if (!this.state.classes) {
      alert('No Classes in LP!');
    }*/
    if (this.state.name === '') {
      alert('Please name your learning path');
    } else if (this.state.topic === '') {
      alert('Please provide a topic');
    } else {
      const requestBody = {
        name: this.state.name,
        topic: this.state.topic,
        mature: this.state.mature,
        ClassList: this.state.classes
      };
      const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
      Axios.post(
        `https://us-central1-ludusfire.cloudfunctions.net/users/${
          this.props.userID
        }/teacher/learningPath/`,
        querystring.stringify(requestBody),
        config
      )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
          alert(error.message);
        });
      alert('Published Learning Path!');
    }
    return false;
  }
}
//list of classes to choose from
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <div className="ClassForm">
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>Back</button>
          <br />
        </section>
      </div>
    </div>
  );
};
