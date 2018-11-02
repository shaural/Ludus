import React, { Component } from 'react';
import 'firebase-auth';
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
      name: props.location.state.name,
      topic: props.location.state.topic,
      owner: props.location.state.owner
      // classList: []
    };
    // alert("Name: "+ props.location.state.topic)
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
    this.setState({ name: '', topic: '', owner: '' });

    alert('Discard changes');
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
          <ControlLabel>Owner: </ControlLabel>
          <FormControl
            type="text"
            name="Owner"
            defaultValue={this.state.name}
            placeholder="Enter text"
            onChange={this.valChange}
          />
          <ControlLabel>Topic: </ControlLabel>
          <FormControl
            type="text"
            name="Topic"
            defaultValue={this.state.topic}
            placeholder="Enter text"
            onChange={this.valChange}
          />
          <ControlLabel>Name: </ControlLabel>
          <FormControl
            type="text"
            name="Owner"
            defaultValue={this.state.name}
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
