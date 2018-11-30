import React, { Component } from 'react';
import ClassAlt from '../class/ClassAlt';

class CreationList extends Component {
  handleRemoveButton = e => {
    let s = e.target.value;
    this.props.callback(s);
  };

  createClasslist = () => {
    let classlist = this.props.classIDs;
    var classes = [];
    for (let id in classlist) {
      if (classlist[id] === undefined) return;
      classes.push(
        <div key={classlist[id]} className="ClassObject">
          {
            <ClassAlt
              classID={classlist[id]}
              classInfo={this.props.classInfo[id]}
            />
          }
          <span className="Highlight">
            <button onClick={this.handleRemoveButton} value={classlist[id]}>
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
