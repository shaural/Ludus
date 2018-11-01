import React, { Component } from 'react';
import Class from './Class';
var querystring = require('querystring');
const Axios = require('axios');

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: '',
      content: '',
      tag: ''
    };
  }
  createClasslist = () => {
    if (!this.props.userID) return;
    //waiting on API call for classIDs
    let query = '?';
    let multi = 0;
    if (this.state.name.toString().length) {
      query += this.state.name;
      multi = 1;
    }
    if (this.state.owner.toString().length) {
      if (multi) query += '&';
      query += this.state.owner;
      multi = 1;
    }
    if (this.state.content.toString().length) {
      if (multi) query += '&';
      query += this.state.content;
      multi = 1;
    }
    if (this.state.tag.toString().length) {
      if (multi) query += '&';
      query += this.state.tag;
    }
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/search/${query}}`
    )
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    let classes = [];
    for (let id in this.state.classIDList) {
      console.log(id);
      classes.push(
        <div className="ClassObject" key={id}>
          {<Class classID={id} />}
        </div>
      );
    }

    return classes;
  };

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
            onChange={event => this.setState({ email: event.target.value })}
          />
          <br /> <br />
          By Owner:&nbsp;
          <input
            className="inLine"
            type="text"
            onChange={event => this.setState({ password: event.target.value })}
          />
          <br /> <br />
          By Content Type:&nbsp;
          <input
            className="inLine"
            type="text"
            onChange={event => this.setState({ confirm: event.target.value })}
          />
          <br /> <br />
          By Tag:&nbsp;
          <input
            className="inLine"
            type="text"
            onChange={event => this.setState({ confirm: event.target.value })}
          />
          <br /> <br />
        </form>
      </div>
    );
  }
}

export default SignUpForm;
