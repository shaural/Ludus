import React, { Component } from 'react';
import 'firebase-auth';
import firebase from 'firebase';
import { ControlLabel, Form, FormControl, Button } from 'react-bootstrap';
import Axios from 'axios';
export class DeleteInterests extends Component {
  constructor(props, context) {
    super(props, context);
    this.valChange = this.valChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.state = {
      interest: ' '
    };
  }
  valChange(e) {
    this.setState({ interest: e.target.value });
  }
  submitData() {
    let user = firebase.auth().currentUser;
    if (user) {
      let email = user.email;
      Axios.get(
        `https://us-central1-ludusfire.cloudfunctions.net/users/getuid/${email}`
      ).then(response => {
        let received = JSON.stringify(response.data);
        let uid = received.substring(1, received.length - 1);
        let interestname = this.state.interest.trimLeft();
        let url = `https://us-central1-ludusfire.cloudfunctions.net/users/${uid}/${interestname}`;
        try {
          Axios.delete(url).then(response => {
            alert('Removed interest');
          });
        } catch (e) {
          alert('An error occured');
        }
      });
    } else {
      alert('You must be logged in to remove an interest');
    }
  }
  render() {
    return (
      <Form horizontal>
        <ControlLabel>
          {' '}
          Type the name of interest you wish to remove{' '}
        </ControlLabel>
        <FormControl
          type="text"
          name="interest"
          defaultValue={this.state.interest}
          placeholder="Enter interest"
          onChange={this.valChange}
        />
        <Button bsStyle="primary" onClick={this.submitData}>
          Save changes
        </Button>
      </Form>
    );
  }
}
