import React, { Component } from 'react';
import './SignUp.css';
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
    Axios.post('https://us-central1-ludusfire.cloudfunctions.net/users/', {
      data: {
        name: document.getElementById('displayname').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value
      }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    return;
  }
}

export default SignUpForm;
