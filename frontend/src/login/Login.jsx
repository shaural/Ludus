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

// TODO: Uncomment this library to implement password hashing
// const bcrypt = require('bcrypt');
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

  submitData() {
    // let hash = bcrypt.hashSync(this.password, 10);
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
          // alert(errorCode);
          alert(errorMessage);
        }
        // else{
        //   // alert('Logged in')
        //   return response.status(200).json
        // }
        // else{
        //   return response.status(200).json{

        //   }
        // }
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
