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
    this.discardChanges = this.discardChanges.bind(this);
    this.state = {
      //TODO: Fill these variables with values from the db
      name: '',
      topic: '',
      owner: '',
      classList: [],
      initialInput: []
    };
  }
  init() {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/${lp_id}`
    ).then(res => {
      this.setState({ initialInput: res.data });
    });
    console.log(res.data);
    this.setState({ name: initialInput['Name'].value });
    this.setState({ topic: initialInput['Topic'].value });
    this.setState({ owner: initialInput['Owner'].value });

    //not sure about this one
    this.setState({ classList: initialInput['Class'].value });
  }

  valChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitData() {
    //TODO: Call the correct endpoint
    // Axios.update
  }
  discardChanges() {
    this.setState({ name: '' });
    this.setState({ topic: '' });
    this.setState({ owner: '' });
    this.setState({ classList: [] });
  }

  render() {
    this.init();
    //TODO: Add support for adding classes
    return (
      <Form horizontal>
        >
        <FormGroup name="Edit learning path info">
          <ControlLabel>Owner: </ControlLabel>
          <FormControl
            type="text"
            name="Owner"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.valChange}
          />
          <ControlLabel>Topic: </ControlLabel>
          <FormControl
            type="text"
            name="Topic"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.valChange}
          />
          <ControlLabel>Owner: </ControlLabel>
          <FormControl
            type="text"
            name="Owner"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.valChange}
          />
        </FormGroup>
        <Button>
          bsStyle="primary" onClick=
          {this.submitData}
          Save changes
        </Button>
        <Button>
          {' '}
          bsStyle="primary" onClick ={this.discardChanges}
          Discard Changes
        </Button>
      </Form>
    );
  }
}
