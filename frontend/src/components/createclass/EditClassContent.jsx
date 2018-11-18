import React, { Component } from 'react';
const Axios = require('axios');

class EditClassContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: '',
      content: '',
      tag: '',
      classList: []
    };
  }

  render() {
    return (
      <div>
        <h1>Search Classes...</h1> <br />
        <form className="SignUpForm">
          <br />
          By Name:&nbsp;
          {'\t\t'}
          <input
            className="inLine"
            type="text"
            onChange={event => this.setState({ name: event.target.value })}
          />
          <br /> <br />
          By Owner:&nbsp;
          <input
            className="inLine"
            type="text"
            onChange={event => this.setState({ owner: event.target.value })}
          />
          <br /> <br />
          By Content Type:&nbsp;
          <input
            className="inLine"
            type="text"
            onChange={event => this.setState({ content: event.target.value })}
          />
          <br /> <br />
          By Tag:&nbsp;
          <input
            className="inLine"
            type="text"
            onChange={event => this.setState({ tag: event.target.value })}
          />
          <br /> <br />
          <input
            className="centered"
            type="button"
            id="submitbutton"
            value="Submit"
            onClick={this.createClasslist}
          />
        </form>
        {this.submitSearch()}
      </div>
    );
  }
}

export default EditClassContent;
