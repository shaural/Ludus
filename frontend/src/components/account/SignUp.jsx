import React, { Component } from 'react';
import firebase from 'firebase';
import './SignUp.css';
import {
  Jumbotron,
  Grid,
  Row,
  Col,
  Panel,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-16-bootstrap-date-picker';
var querystring = require('querystring');
const Axios = require('axios');

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirm: '',
      dob: ''
    };
    this.submitForm = this.submitForm.bind(this);
  }
  validateName() {
    return this.state.displayName ? 'success' : 'error';
  }
  validateEmail() {
    return this.state.email.toString().includes('@') &&
      this.state.email.toString().includes('.')
      ? 'success'
      : 'error';
  }
  validatePassword() {
    return this.state.password &&
      this.state.confirm &&
      this.state.password.length >= 10 &&
      this.state.password === this.state.confirm
      ? 'success'
      : 'error';
  }
  validateDob() {
    return this.state.dob ? 'success' : 'error';
  }

  render() {
    return (
      <Jumbotron>
        <Grid>
          <Row />
          <Row>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h1">Create an account</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Form horizontal>
                  <FormGroup validationState={this.validateName()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Display name
                    </Col>
                    <Col sm={8}>
                      <FormControl
                        type="text"
                        onChange={event =>
                          this.setState({ displayName: event.target.value })
                        }
                      />
                      <FormControl.Feedback />
                    </Col>
                    {this.validateName() !== 'success' ? (
                      <Col componentClass={HelpBlock} sm={2}>
                        Display name cannot be blank
                      </Col>
                    ) : (
                      ''
                    )}
                  </FormGroup>
                  <FormGroup validationState={this.validateEmail()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Email
                    </Col>
                    <Col sm={8}>
                      <FormControl
                        type="text"
                        value={this.state.email}
                        onChange={event =>
                          this.setState({ email: event.target.value })
                        }
                      />
                      <FormControl.Feedback />
                    </Col>
                    {this.validateEmail() !== 'success' ? (
                      <Col componentClass={HelpBlock} sm={2}>
                        You must enter a valid email
                      </Col>
                    ) : (
                      ''
                    )}
                  </FormGroup>
                  <FormGroup validationState={this.validatePassword()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Password
                    </Col>
                    <Col sm={8}>
                      <FormControl
                        type="password"
                        onChange={event =>
                          this.setState({ password: event.target.value })
                        }
                      />
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup validationState={this.validatePassword()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Confirm Password
                    </Col>
                    <Col sm={8}>
                      <FormControl
                        type="password"
                        onChange={event =>
                          this.setState({ confirm: event.target.value })
                        }
                      />
                      <FormControl.Feedback />
                    </Col>
                    {this.validatePassword() !== 'success' ? (
                      <Col componentClass={HelpBlock} sm={2}>
                        Passwords must match and be >10 characters
                      </Col>
                    ) : (
                      ''
                    )}
                  </FormGroup>
                  <FormGroup validationState={this.validateDob()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Birth Date
                    </Col>
                    <Col sm={8}>
                      <DatePicker
                        value={this.state.dob}
                        onChange={val => this.setState({ dob: val })}
                      />
                      <FormControl.Feedback />
                    </Col>
                    {this.validateDob() !== 'success' ? (
                      <Col componentClass={HelpBlock} sm={2}>
                        You must enter a date
                      </Col>
                    ) : (
                      ''
                    )}
                  </FormGroup>
                  <Button type="submit" onClick={this.submitForm}>
                    Submit
                  </Button>
                </Form>
              </Panel.Body>
            </Panel>
          </Row>
          <Row />
        </Grid>
      </Jumbotron>
    );
  }

  submitForm(e) {
    e.preventDefault();
    if (
      !this.state.email.toString().includes('@') &&
      !this.state.email.toString().includes('.')
    ) {
      alert('Invalid email, please try again');
    } else if (!this.state.password.toString().length) {
      alert('Empty passwords are not allowed, please try again');
    } else if (this.state.password.toString().length < 10) {
      alert('Minimum password length: 10 characters, please try again');
    } else if (!this.state.displayName.toString().length) {
      alert('You may not have an empty name');
    } else if (this.state.password !== this.state.confirm) {
      alert("Passwords don't match");
    } else if (!this.state.dob.toString().length) {
      alert('Please enter your age');
    } else {
      const requestBody = {
        name: this.state.displayName,
        email: this.state.email,
        dob: this.state.dob
      };
      const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
      Axios.post(
        'https://us-central1-ludusfire.cloudfunctions.net/users/',
        querystring.stringify(requestBody),
        config
      )
        .then(response => {
          console.log(response);
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            );
          alert('Successfully Signed Up!');
          this.props.history.push('/login');
        })
        .catch(function(error) {
          alert(error);
        });
    }
    return false;
  }
}

export default withRouter(SignUpForm);
