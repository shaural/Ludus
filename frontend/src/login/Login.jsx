import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import app from '../conf';
import 'firebase-auth';
import firebase from 'firebase';
import {
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
//  firebase.initializeApp(conf);

const Axios = require('axios');

export class Login extends Component {

  constructor(props, context) {
    super(props, context);
    this.userNameHandleChange = this.userNameHandleChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillMount() {
    app.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.email);

      } else {
    // No user is signed in.
      }
    });
  }

  /*logOut(){
    app.auth().signOut().then(function() {
      console.log("Signout Successful");
    }).catch(function(error) {

    });
  }*/

  submitData() {
    let uname = this.state.username;
    let pwd = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(uname, pwd)
      .then(response => {
        alert('Logged in');
      })
      .catch(function(error) {
        // const errorCode = error.code;
        const errorMessage = error.message;
        if (error) {
          alert(errorMessage);
        }
      });
  }

  userNameHandleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Form horizontal>
        <FormGroup name="Enter name">
          <ControlLabel>Username: </ControlLabel>
          <FormControl
            type="text"
            name="username"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.userNameHandleChange}
          />
        </FormGroup>

        <FormGroup name="Enter password">
          <ControlLabel>Password: </ControlLabel>
          <FormControl
            type="password"
            name="password"
            value={this.state.value}
            placeholder="password"
            onChange={this.userNameHandleChange}
          />
        </FormGroup>
        <Button bsStyle="primary" onClick={this.submitData}>
          Enter
        </Button>
        <FormControl.Feedback />
        &nbsp;
      {/*<Button bsStyle="primary" onClick={this.logOut()}> LogOut </Button>*/}
        {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
      </Form>

    );
  }
}
