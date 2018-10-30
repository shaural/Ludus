import React, { Component } from 'react';
import 'firebase-auth';
import firebase from 'firebase';
var querystring = require('querystring');
const Axios = require('axios');
import {
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';

export class EditLP extends Component {
  constructor(props, context) {
    super(props, context);
    this.valChange = this.valChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.state = {
      //TODO: Fill these variables with values from the db
      name: '',
      topic: '',
      owner: '',
      classList: ''
    };
  }

  valChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitData() {}

  render() {
    return <Form horizontal>></Form>;
  }
}
