import React, { Component } from 'react';
import Class from '../class/Class';
import '../class/Classlist.css';

class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createClasslist = () => {
    let classIDList = ['1234', '1234'];
    //waiting on API call for classIDs
    //axios.get('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: /*produce userID from somewhere*/ }).then( function(response){});

    var classes = [];
    for (let id in classIDList) {
      <div className="ClassObject">
        {<Class classID={id /*id*/} />}
        <span className="Highlight">{<button value={id} />}</span>
      </div>;
    }

    return classes;
  };

  render() {
    return <div className="Classlist">{this.createClasslist()}</div>;
  }
}

export default AddList;
