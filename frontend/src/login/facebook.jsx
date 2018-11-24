import React, { Component } from 'react';
import conf from '../conf.js';
import 'firebase-auth';
import firebase from 'firebase';
import {
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
firebase.initializeApp(conf);
export class FacebookLogin extends Component {
  constructor(props, context) {
    super(props, context);
    this.userNameHandleChange = this.userNameHandleChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  submitData() {
    let uname = this.state.username;
    let pwd = this.state.password;
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup'
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
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
        {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
      </Form>
    );
  }
}
