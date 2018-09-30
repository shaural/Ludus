import React, { Component } from 'react';
import Class from './Class.jsx';

//Need some array, to store ClassID's fetched from the database using the userID


class Classlist extends Component {
  createClasslist = () => {
    //let classIDList = []
    //TODO: Call API for classIDs
    let classes = []
    
    for (let i = 0; i < 5; i++) {
      classes.push(<div>{<Class classID = {i /* classIDList[k] */} />}</div>)
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
