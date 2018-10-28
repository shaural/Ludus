import React, { Component } from 'react';
import conf from '../../conf.js';
//import 'firebase-auth';
import firebase from 'firebase';
import './SignUp.css';
var querystring = require('querystring');
const Axios = require('axios');

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirm: '',
      dob: ''
    };
    this.submitForm = this.submitForm.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Create an Account</h1> <br />
        <form className="SignUpForm">
          <br />
          Display Name:&nbsp;
          <input
            className="inLine"
            type="text"
            onChange={event =>
              this.setState({ displayName: event.target.value })
            }
          />
          <br /> <br />
          Email:&nbsp;
          {'\t\t'}
          <input
            className="inLine"
            type="text"
            onChange={event => this.setState({ email: event.target.value })}
          />
          <br /> <br />
          Password:&nbsp;
          <input
            className="inLine"
            type="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
          <br /> <br />
          Confirm Password:&nbsp;
          <input
            className="inLine"
            type="password"
            onChange={event => this.setState({ confirm: event.target.value })}
          />
          <br /> <br />
          Date of Birth:&nbsp;
          <input
            className="inLinedob"
            type="date"
            onChange={event => this.setState({ dob: event.target.value })}
          />
          <br /> <br />
          <input
            className="centered"
            type="button"
            id="submitbutton"
            value="Submit"
            onClick={this.submitForm}
          />
        </form>
      </div>
    );
  }

  submitForm() {
    if (!this.state.email.toString().includes('@')) {
      alert('Invalid email, please try again');
    } else if (!this.state.password.toString().length) {
      alert('Empty passwords are not allowed, please try again');
    } else if (this.state.password.toString().length < 10) {
      alert('Minimum password length: 10 characters, please try again');
    } else if (!this.state.displayName.toString().length) {
      alert('You may not have an empty name');
    } else if (this.state.password != this.state.confirm) {
      alert("Passwords don't match");
    } else if (!this.state.dob.toString().length) {
      alert('Please enter your age');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.dob);
      const requestBody = {
        name: this.state.displayName,
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
      alert('Successfully Signed Up!');
    }
    return false;
  }
}

export default SignUpForm;
