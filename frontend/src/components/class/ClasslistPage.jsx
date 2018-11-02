import React, { Component } from 'react';
import ClassList from './Classlist';

import NavBar from '../NavBar';

class ClasslistPage extends Component {
  render() {
    return (
      <div>
        <NavBar /> <ClassList userID={this.props.userID} />
      </div>
    );
  }
}
export default ClasslistPage;
