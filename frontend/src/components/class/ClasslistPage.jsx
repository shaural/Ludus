import React, { Component } from 'react';
import ClassList from './ClassList';
import NavBar from '../NavBar';

class ClasslistPage extends Component {
  render() {
    return (
      <div>
        <NavBar /> <ClasslistHeader /> <Classlist userID={this.props.userID} />
      </div>
    );
  }
}
export default ClasslistPage;
