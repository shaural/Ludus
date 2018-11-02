import React, { Component } from 'react';
import Class from './Class';
import ClassRemoveButton from './ClassRemoveButton';
import ClassEditButton from './ClassEditButton';
import './Classlist.css';
const Axios = require('axios');

class Classlist extends Component {
  constructor(props) {
    super(props);
    this.state = { classIDList: [] };
  }
  /*-LNVWR9kD2dvN8GLGFYE*/
  componentDidMount = () => {
    if (!this.props.userID) return;
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/classlist/${
        this.props.userID
      }`
    )
      .then(response => {
        console.log(response);
        this.setState({ classIDList: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    return;
  };
  createClasslist = () => {
    let classes = [];
    for (let id in this.state.classIDList) {
      classes.push(
        <div className="ClassObject" key={id}>
          {<Class classID={id} />}
          <span className="Highlight">
            {<ClassEditButton classID={id} />} &nbsp;{' '}
            {<ClassRemoveButton classID={id} />}
          </span>
        </div>
      );
    }

    return classes;
  };

  render() {
    return <div className="Classlist">{this.createClasslist()}</div>;
  }
}

export default Classlist;
