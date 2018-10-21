import React, { Component } from 'react';
import './SignUp.css';
var querystring = require('querystring');
const Axios = require('axios');

class SignUpForm extends Component {
  render() {
    return (
      <form className="SignUpForm">
        Display Name:&nbsp;
        <input type="text" id="displayname" />
        <br /> <br />
        Email:&nbsp;
        {'\t\t'}
        <input type="text" id="email" />
        <br /> <br />
        Password:&nbsp;
        <input type="password" id="password" />
        <br /> <br />
        {/*Confirm Password:&nbsp;*/}
        {/*<input id="passwordconfirm" /><br />*/}
        Date of Birth:&nbsp;
        <input type="date" id="dob" />
        <br /> <br />
        <input type="submit" id="submitbutton" onClick={this.submitForm} />
      </form>
    );
  }

  submitForm() {
    const requestBody = {
      name: document.getElementById('displayname').value,
      password: document.getElementById('password').value,
      email: document.getElementById('email').value,
      dob: document.getElementById('dob').value
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
