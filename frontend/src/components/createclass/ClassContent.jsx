import React, { Component } from 'react';
import '../class/ClassList.css';
const Axios = require('axios');
var querystring = require('querystring');

class ClassContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: this.props.userID,
      etc: '', //estimated time to completed
      content: ''
    };
    this.submitLP = this.submitClass.bind(this);
  }

  render() {
    return (
      <div>
        <form className="inputs">
          Class Name:&nbsp;
          <input
            className="long"
            type="text"
            onChange={event => this.setState({ name: event.target.value })}
          />
          <br /> <br />
          Estimated Time:&nbsp;
          {'\t\t'}
          <input
            className="long"
            type="text"
            onChange={event => this.setState({ etc: event.target.value })}
          />
          <br /> <br />
          Video Link or Text:&nbsp;
          {'\t\t'}
          <input
            className="long"
            type="text"
            onChange={event => this.setState({ content: event.target.value })}
          />
        </form>
        <h1>
          <center>OR ...</center>
        </h1>
        <div className="lpcontainer">
          {''}
          <button type="button" onClick={this.showModal}>
            Upload Content
          </button>
        </div>
        <button onClick={this.submitClass}>Publish</button>
      </div>
    );
  }

  submitClass() {

    const requestBody = {
      name: this.state.name,
      owner: this.props.userID,
      content: this.state.content
    };

    Axios.post(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/`,
      querystring.stringify(requestBody)
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
        alert(error.message);
      });
    alert('Published Class!');

    return false;
  }
}

export default ClassContent;
