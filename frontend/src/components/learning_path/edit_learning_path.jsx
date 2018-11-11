import React, { Component } from 'react';
import 'firebase-auth';
import {
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import Axios from 'axios';
import { request } from 'https';
// import { prependOnceListener } from 'cluster';
export class EditLP extends Component {
  constructor(props, context) {
    super(props, context);
    this.valChange = this.valChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.state = {
      lpid: props.location.state.lpid,
      name: props.location.state.name,
      topic: props.location.state.topic
    };
  }

  valChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitData() {
    //TODO: Call the correct endpoint
    var data = JSON.stringify({
      topic: this.state.topic,
      name: this.state.name
    });
    Axios.patch(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/${
        this.state.lpid
      }`,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(alert('Saved changes'))
      .catch(function(error) {
        alert('Failed to update :/');
      });
  }
  discardChanges() {
    this.setState({ name: '', topic: '' });

    alert('Discarded changes');
    /*leftover code from render()

    <Button bsStyle="primary" onClick={this.discardChanges}>
          Discard Changes
        </Button>
      </Form>
      */
  }

  render() {
    //TODO: Add support for adding classes
    return (
      <Form horizontal>
        <FormGroup name="Edit learning path info">
          <ControlLabel>Name: </ControlLabel>
          <FormControl
            type="text"
            name="name"
            defaultValue={this.state.name}
            placeholder="Enter text"
            onChange={this.valChange}
          />
          <ControlLabel>Topic: </ControlLabel>
          <FormControl
            type="text"
            name="topic"
            defaultValue={this.state.topic}
            placeholder="Enter text"
            onChange={this.valChange}
          />
        </FormGroup>
        <Button bsStyle="primary" onClick={this.submitData}>
          Save changes
        </Button>
      </Form>
    );
  }
}
export default EditLP;
