import React, { Component } from 'react';
import NavBar from '../NavBar';
import ClassContent from './ClassContent';
import './ClassCreation.css';

class ClassCreatePage extends Component {
  render() {
    return (
      <main>
        <h1>Create a Class</h1>
        <ClassContent userID={this.props.userID} />
      </main>
    );
  }
}

export default ClassCreatePage;
