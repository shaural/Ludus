import React, { Component } from 'react';
import Class from './Class';
import ClassRemoveButton from './ClassRemoveButton';
import ClassEditButton from './ClassEditButton';
import './Classlist.css';

class Classlist extends Component {
  createClasslist = () => {
    //let classIDList = []
    //waiting on API call for classIDs
    //axios.get('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: /*produce userID from somewhere*/ }).then( function(response){});

    let classes = [];

    //for (let i = 0; i < classIDList.length; i++) {
    for (let i = 0; i < 17; i++) {
      classes.push(
        <div className="ClassObject">
          {<Class classID={i /* classIDList[i] */} />}
          <span className="Highlight">
            {<ClassEditButton classID={i /* classIDList[i] */} />} &nbsp;{' '}
            {<ClassRemoveButton classID={i /* classIDList[i] */} />}
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
