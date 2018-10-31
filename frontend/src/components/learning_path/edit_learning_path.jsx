import React, { Component } from 'react';
import 'firebase-auth';
import {
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
var querystring = require('querystring');
const Axios = require('axios');

export class EditLP extends Component {
  constructor(props, context) {
    super(props, context);
    this.valChange = this.valChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.state = {
      name: props.name,
      topic: props.topic,
      owner: props.owner
      // classList: []
    };
  }

  valChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitData() {
    //TODO: Call the correct endpoint
    // Axios.update
    alert('Need to add endpoint to submit data');
  }
  discardChanges() {
    this.setState({ name: '' });
    this.setState({ topic: '' });
    this.setState({ owner: '' });
    // this.setState({ classList: [] });
  }

  render() {
    alert('Entered render');
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
export default EditLP;
