import React, { Component } from 'react';
import './SignUp.css';
var querystring = require('querystring');
const Axios = require('axios');

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { displayName: '', email: '', password: '', dob: '' };
    this.submitForm = this.submitForm.bind(this);
  }

  render() {
    return (
      <form className="SignUpForm">
        Display Name:&nbsp;
        <input
          type="text"
          onChange={event => this.setState({ displayName: event.target.value })}
        />
        <br /> <br />
        Email:&nbsp;
        {'\t\t'}
        <input
          type="text"
          onChange={event => this.setState({ email: event.target.value })}
        />
        <br /> <br />
        Password:&nbsp;
        <input
          type="password"
          onChange={event => this.setState({ password: event.target.value })}
        />
        <br /> <br />
        {/*Confirm Password:&nbsp;*/}
        {/*<input id="passwordconfirm" /><br />*/}
        Date of Birth:&nbsp;
        <input
          type="date"
          onChange={event => this.setState({ dob: event.target.value })}
        />
        <br /> <br />
        <input
          type="button"
          id="submitbutton"
          value="Submit"
          onClick={this.submitForm}
        />
      </form>
    );
  }

  submitForm() {
    const requestBody = {
      name: this.state.displayName,
      password: this.state.password,
      email: this.state.email,
      dob: this.state.dob
    };
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    Axios.post(
      'https://us-central1-ludusfire.cloudfunctions.net/users/',
      querystring.stringify(requestBody),
      config
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    return false;
  }
}

export default SignUpForm;
