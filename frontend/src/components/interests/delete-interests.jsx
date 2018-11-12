import React, { Component } from 'react';
import 'firebase-auth';
import firebase from 'firebase';
import {
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
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
        const out = JSON.stringify(response.data);
        let targetindex = out.lastIndexOf(':') + 1;
        let temp = out.substr(targetindex, out.length);
        let uid = temp.substring(0, temp.length - 2);
        alert(uid);
        alert(out);
        alert(this.state.interest);
        Axios.delete(
          `https://us-central1-ludusfire.cloudfunctions.net/users/${uid}/${
            this.state.interest
          }`
        ).then(response => {
          alert('Interest removed');
        });
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
