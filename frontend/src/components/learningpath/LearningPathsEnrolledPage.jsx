import React, { Component } from 'react';
import NavBar from '../NavBar';
import LearningPathsEnrolled from './LearningPathsEnrolled';
//import './LearningPathsEnrolledPage.css';

export default class LearningPathCreatePage extends Component {
  render() {
    return (
      <main>
        <NavBar />
        <h1>Create a Learning Path</h1>
        <LearningPathsEnrolled userID={this.props.userID} />
      </main>
    );
  }
}
