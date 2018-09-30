import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  HelpBlock,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';

var firebase = require('firebase-login');
const bcrypt = require('bcrypt');

export class Login extends Component {
  constructor(props, context) {
    super(props, context);
    // this.passwordHandleChange = this.passwordHandleChange.bind(this);
    this.userNameHandleChange = this.userNameHandleChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  submitData() {
    bcrypt.hash(this.password, 10, function(err, hash) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    });
  }

  userNameHandleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // passwordHandleChange(e){

  //   this.setState({ value: e.target.value });
  // }

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
