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
      prereq: '',
      mature: 'no',
      classes: []
    };
    this.handleAddClass = this.handleAddClass.bind(this);
    this.handleRemoveClass = this.handleRemoveClass.bind(this);
    this.submitLP = this.submitLP.bind(this);
    this.changePrereq = this.changePrereq.bind(this);
    this.submitPrereq = this.submitPrereq.bind(this);
  }

  submitPrereq = () => {
    let data = JSON.stringify({
      pre_reqs_list: this.state.prereq
    });
    if (
      this.state.name.toString().length != 0 &&
      this.state.topic.toString().length != 0
    ) {
      Axios.patch(
        `https://us-central1-ludusfire.cloudfunctions.net/learningPath/
     ${this.state.topic}/recommended_pre_reqs`,
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(err) {
          alert(err);
          console.log(err.data);
        });
    } else {
      //ignore empty lp
      alert(
        'You may not create pre-requisites for a non-existent learning path'
      );
    }
  };

  showModal = () => {
    this.setState({ show: true });
  };

  changePrereq = e => {
    this.setState({ preq: e.value });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleMatureCheck = event => {
    console.log(this.state.mature);
    if (event.target.checked) {
      this.setState({ mature: 'yes' });
    } else {
      this.setState({ mature: 'no' });
    }
    console.log(this.state.mature);
  };

  render() {
    return (
      <div>
        <form className="pre-reqs">
          Add a recommended pre-requisite learning path here [optional]:&nbsp;
          <input className="prereq" type="text" onChange={this.changePrereq} />
          <button type="button" onClick={this.submitPrereq}>
            Click here to add a recommended pre-req
          </button>
        </form>

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
  handleAddClass(event) {
    console.log(event);
    if (!this.state.classes);
    else {
      if (this.state.classes.indexOf(event) !== -1) {
        alert('That class is already in the learning path!');
        return;
      }
    }
    var array = [...this.state.classes, event];
    this.setState({ classes: array });
  }

  handleRemoveClass(event) {
    console.log(event);
    var array = [...this.state.classes];
    var index = array.indexOf(event);
    array.splice(index, 1);
    this.setState({ classes: array });
  }

  submitLP() {
    /*
    if (!this.state.classes) {
      alert('No Classes in LP!');
    }*/
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
