import React, { Component } from 'react';
import ClassList from './ClassList';

class ClasslistPage extends Component {
  render() {
    return (
      <div>
        <h1>My Classes</h1> <ClassList userID={this.props.userID} />
      </div>
    );
  }
}
export default ClasslistPage;
