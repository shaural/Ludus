import React, { Component } from 'react';
import Class from './Class';
const Axios = require('axios');

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: '',
      content: '',
      tag: '',
      classList: []
    };
    this.submitSearch = this.submitSearch.bind(this);
  }

  createClasslist = () => {
    let query = '?';
    let multi = 0;
    if (this.state.name.toString().length) {
      query += 'name=' + this.state.name;
      multi = 1;
    }
    if (this.state.owner.toString().length) {
      if (multi) query += '&';
      query += 'owner=' + this.state.owner;
      multi = 1;
    }
    if (this.state.content.toString().length) {
      if (multi) query += '&';
      query += 'content_type=' + this.state.content;
      multi = 1;
    }
    if (this.state.tag.toString().length) {
      if (multi) query += '&';
      query += 'tag=' + this.state.tag;
    }
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/search/${query}`
    )
      .then(response => {
        console.log(response);
        let classList = [];
        for (let id in response.data) {
          for (let sid in id) {
            classList.push(response.data[id][sid]);
          }
        }
        this.setState({ classIDList: classList });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(this.submitSearch);
    return;
  };

  submitSearch = () => {
    if (this.state.classIDList === undefined || !this.state.classIDList) return;
    let classes = [];
    for (let id in this.state.classIDList) {
      classes.push(
        <div className="ClassObject" key={id}>
          {<Class classID={this.state.classIDList[id]} />}
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
            value="Search"
            onClick={this.createClasslist}
          />
        </form>
        {this.submitSearch()}
      </div>
    );
  }
}

export default SignUpForm;
