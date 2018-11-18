import React, { Component } from 'react';
import 'firebase-auth';
import firebase from 'firebase';
import { ControlLabel, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
export class AddInterests extends Component {
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
      )
        .then(response => {
          //remove quotes from response
          const out = JSON.stringify(response.data);
          let uid = out.substring(1, out.length - 1);
          let interestname = this.state.interest.trimLeft();
          Axios.patch(
            `https://us-central1-ludusfire.cloudfunctions.net/users/${uid}/${interestname}`
          )
            .then(response => {
              alert('Interest saved');
            })
            .catch(error => {
              alert('There was an error saving the interest: ' + error);
            });
        })
        .catch(function(error) {
          alert(error);
        });
    } else {
      alert("You aren't logged in");
    }
  }
  render() {
    //TODO: Add button that adds a new form entry each time it's clicked?
    return (
      <Form horizontal>
        <ControlLabel> Enter interest </ControlLabel>
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
        <Link to="/remove">Remove an interest</Link>
      </Form>
    );
  }
}
