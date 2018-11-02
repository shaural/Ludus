import React, { Component } from 'react';
import Classlist from './Classlist';
import ClasslistHeader from './ClasslistHeader';
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
