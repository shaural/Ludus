import React, { Component } from 'react';
import NavBar from '../NavBar';
import CreationList from './CreationList';
import './LearningPathCreatePage.css';

export default class LearningPathCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
    };
  }
  render() {
    return (
      <main>
        <NavBar />
        <h1>Create a Learning Path</h1>
        <CreationList />
      </main>
    );
  }

  handleRemovePeople(e) {
    var array = [...this.state.classes, e.target.value];
    this.setState({ classes: array });
  }

  handleRemovePeople(e) {
    var array = [...this.state.classes];
    var index = array.indexOf(e.target.value);
    array.splice(index, 1);
    this.setState({ classes: array });
  }
}
