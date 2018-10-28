import React, { Component } from 'react';
import NavBar from '../NavBar';
import CreationList from './CreationList';
import './LearningPathCreatePage.css';

export default class LearningPathCreatePage extends Component {
  render() {
    return (
      <main>
        <NavBar />
        <h1>Create a Learning Path</h1>
        <CreationList />
      </main>
    );
  }
}
