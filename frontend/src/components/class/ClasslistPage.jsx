import React, { Component } from 'react';
import ClassList from './ClassList';

import NavBar from '../NavBar';

class ClasslistPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>My Classes</h1> <ClassList userID={this.props.userID} />
      </div>
    );
  }
}
export default ClasslistPage;
