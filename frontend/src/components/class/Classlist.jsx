import React, { Component } from 'react';
import Class from './Class';
import ClassRemoveButton from './ClassRemoveButton';
import ClassEditButton from './ClassEditButton';
import './Classlist.css';
const Axios = require('axios');
var querystring = require('querystring');

class Classlist extends Component {
  createClasslist = () => {
    let classIDList = [];
    //waiting on API call for classIDs
    const requestBody = {
      userID: '-LNVWR9kD2dvN8GLGFYE'
    };
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    Axios.get(
      'https://us-central1-ludusfire.cloudfunctions.net/classlist/',
      querystring.stringify(requestBody),
      config
    )
      .then(function(response) {
        for (let id in response) {
          classIDList.push(id);
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    let classes = [];

    //for (let i = 0; i < classIDList.length; i++) {
    for (let id in classIDList) {
      classes.push(
        <div className="ClassObject">
          {<Class classID={id} />}
          <span className="Highlight">
            {<ClassEditButton classID={id} />} &nbsp;{' '}
            {/*<ClassRemoveButton classID={i /* classIDList[i] } />*/}
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
