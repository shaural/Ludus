import React, { Component } from 'react';
import 'firebase-auth';
import firebase from 'firebase';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';
export class PasswordReset extends Component {
  constructor(props, context) {
    super(props, context);
    this.changeEmail = this.changeEmail.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      email: ''
    };
  }

  submit() {
    let useremail = this.state.email;
    if (useremail) {
      firebase
        .auth()
        .sendPasswordResetEmail(useremail)
        .then(function() {
          alert('Email sent to ' + useremail);
        })
        .catch(function(error) {
          alert(
            'A fatal error occured when attempting to send a password reset email'
          );
        });
    } else {
      alert("Can't send a reset email to an empty address");
    }
  }
  render() {
    return (
      <Form horizontal>
        <FormGroup name="Enter email">
          <ControlLabel>Username: </ControlLabel>
          <FormControl
            type="text"
            name="email"
            value={this.state.value}
            placeholder="Enter email"
            onChange={this.changeEmail}
          />
          <Button bsStyle="primary" onClick={this.submit}>
            Enter
          </Button>
        </FormGroup>
        >
      </Form>
    );
  }

  changeEmail(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
}

export default PasswordReset;
