import React, { Component } from 'react';
import LearningPathCreate from './LearningPathCreate';
import './LearningPathCreatePage.css';

export default class LearningPathCreatePage extends Component {
  render() {
    return (
      <main>
        <h1>Create a Learning Path</h1>
        <LearningPathCreate userID={this.props.userID} />
      </main>
    );
  }
}
