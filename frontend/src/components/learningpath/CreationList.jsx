import React, { Component } from 'react';
import Class from '../class/Class';

class CreationList extends Component {
  constructor(props) {
    super(props);
    this.state = { classIDs: ['-LNzxRJDHFYaiXTz7xNE'] };
  }

  handleClick = e => {
    this.props.callback(e.target.value);
  };

  createClasslist = () => {
    let classlist = this.state.classIDs;
    var classes = [];
    for (let id in classlist) {
      classes.push(
        <div key={classlist[id]} className="ClassObject">
          {<Class classID={classlist[id]} />}
          <span className="Highlight">
            <button onClick={this.handleClick} value={classlist[id]}>
              Remove
            </button>{' '}
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

export default CreationList;
