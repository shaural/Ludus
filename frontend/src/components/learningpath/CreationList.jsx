import React, { Component } from 'react';
import Class from '../class/Class';
import '../class/Classlist.css';

class CreationList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createClasslist = () => {
    //let classIDList = []
    //waiting on API call for classIDs
    //axios.get('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: /*produce userID from somewhere*/ }).then( function(response){});

    let classlist = this.props.classIDs;
    var classes = [];
    for (let id in classlist) {
      <div className="ClassObject">
        {<Class classID={id} />}
        <span className="Highlight">
          <button onClick={this.props.callback} value={id} />
          {/*<ClassRemoveButton classID={id} />*/}
        </span>
      </div>;
    }

    return classes;
  };

  render() {
    return <div className="Classlist">{this.createClasslist()}</div>;
  }
}

export default CreationList;
