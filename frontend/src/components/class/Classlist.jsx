import React, { Component } from 'react';
import Class from './Class';
import ClassRemoveButton from './ClassRemoveButton';
import ClassEditButton from './ClassEditButton';
import './Classlist.css';
//Need some array, to store ClassID's fetched from the database using the userID


class Classlist extends Component {
  createClasslist = () => {
    //let classIDList = []
    //TODO: Call API for classIDs
    let classes = []
    
    for (let i = 0; i < 17; i++) {
      classes.push(
      <div  className="ClassObject">
        {<Class classID = {i /* classIDList[k] */} />} 
        <span className="Highlight">
          {<ClassEditButton />}
          <text>{" "}</text>
          {<ClassRemoveButton />}
        </span>
      </div>
      );
    }

    return classes
  }

  render() {
    return (
        <div className="Classlist">
          {this.createClasslist()}
        </div>
    );
  }

}

export default Classlist;
