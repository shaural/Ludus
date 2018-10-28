import React, { Component } from 'react';
import Class from './Class';
import './Classlist.css';

class Classlist extends Component {
  constructor(props) {
    super(props);
    this.state = { selection: '' };
  }

  createClasslist = () => {
    //let classIDList = []
    //waiting on API call for classIDs
    //axios.get('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: /*produce userID from somewhere*/ }).then( function(response){});

    let classes = [];

    //for (let i = 0; i < classIDList.length; i++) {
    for (let i = 0; i < 1; i++) {
      classes.push(
        <div
          className="ClassObject"
          value={i /* Class Id once integrated */}
          onClick={event => this.setState({ selection: event.target.value })}
        >
          {<Class classID={'-LNzxFQ8ZVt3igdnFl7e' /* classIDList[i] */} />}
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
