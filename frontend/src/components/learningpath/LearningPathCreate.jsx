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
      classes: [],
      classInfo: [],
      hidden: true
    };
    this.handleAddClass = this.handleAddClass.bind(this);
    this.handleRemoveClass = this.handleRemoveClass.bind(this);
    this.submitLP = this.submitLP.bind(this);
    this.changePrereq = this.changePrereq.bind(this);
    this.submitPrereq = this.submitPrereq.bind(this);
  }

  //modal show and hide
  submitPrereq = () => {
    let data = {
      pre_reqs_list: this.state.prereq.toString().trim()
    };
    // alert(this.state.prereq.toString())
    // alert(this.state.name.toString());
    if (
      this.state.name.toString().length != 0 &&
      this.state.topic.toString().length != 0
    ) {
      // alert(this.state.name.toString().trim())
      let request = `https://us-central1-ludusfire.cloudfunctions.net/learningPath/${this.state.name
        .toString()
        .trim()}/recommended_pre_reqs`;
      // alert(request);
      Axios.patch(request, querystring.stringify(data))
        .then(function(resp) {
          // console.log(resp);
          alert('Successfully added pre-requisite');
          this.setState({ hidden: false });
        })
        .catch(function(err) {
          alert(err);
          // console.log(err.data);
        });
    } else {
      //ignore empty lp
      alert('You may not create pre-requisites for an empty learning path');
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

  //mature checkbox
  handleMatureCheck = event => {
    if (event.target.checked) {
      this.setState({ mature: 'yes' });
    } else {
      this.setState({ mature: 'no' });
    }
  };

  toggleHide() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  preReqForm = () => {
    <div>
      <form className="pre-reqs">
        Add a recommended pre-requisite learning path here [optional]:&nbsp;
        <input
          className="prereq"
          type="text"
          onChange={event => this.setState({ prereq: event.target.value })}
        />
        <button type="button" onClick={this.submitPrereq}>
          Click here to add a recommended pre-req
        </button>
      </form>
    </div>;
  };
  render() {
    if (!this.state.hidden) {
      return (
        <div>
          <form className="pre-reqs">
            Add a recommended pre-requisite learning path here [optional]:&nbsp;
            <input
              className="prereq"
              type="text"
              onChange={event => this.setState({ prereq: event.target.value })}
            />
            <button type="button" onClick={this.submitPrereq}>
              Click here to add a recommended pre-req
            </button>
          </form>
        </div>
      );
    } else {
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
            {/*List of currently selected classes*/}
            <CreationList
              classIDs={this.state.classes}
              classInfo={this.state.classInfo}
              callback={this.handleRemoveClass}
            />
            {/*Popup with search for classes to add to lp*/}
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
  }

  //callback for adding a class to the selection
  handleAddClass(classID, classInfo) {
    if (!this.state.classes);
    else {
      if (this.state.classes.indexOf(classID) != -1) {
        alert('That class is already in the learning path!');
        return;
      }
    }
    console.log(classInfo);
    var idArray = [...this.state.classes, classID];
    var infoArray = [...this.state.classInfo, classInfo];
    this.setState({ classes: idArray, classInfo: infoArray });
  }

  //callback for removing a class from the selection
  handleRemoveClass(event) {
    console.log(event);
    var idArray = [...this.state.classes];
    var infoArray = [...this.state.classInfo];
    var index = idArray.indexOf(event);
    idArray.splice(index, 1);
    infoArray.splice(index, 1);
    this.setState({ classes: idArray, classInfo: infoArray });
  }

  submitLP() {
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
        .then(response => {
          this.setState({ hidden: false });
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

//modal functionality for class chooser
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
