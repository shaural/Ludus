import React, { Component } from 'react';
import conf from '../conf.js';
import 'firebase-auth';
import firebase from 'firebase';
import {
  Jumbotron,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
  Panel,
  Button
} from 'react-bootstrap';
firebase.initializeApp(conf);
export class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.userNameHandleChange = this.userNameHandleChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  submitData() {
    let uname = this.state.username;
    let pwd = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(uname, pwd)
      .then(response => {
        alert('Logged in');
        // TODO: redirect to user profile page
        // this.props.history.push("/profile");
      })
      .catch(function(error) {
        // const errorCode = error.code;
        const errorMessage = error.message;
        if (error) {
          alert(errorMessage);
        }
      });
  }

  userNameHandleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Jumbotron>
        <Grid>
          <Row />
          <Row>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h1">
                  Log into an account
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Form horizontal>
                  <FormGroup name="Enter name">
                    <Col componentClass={ControlLabel} sm={2}>
                      Username
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="text"
                        name="username"
                        value={this.state.value}
                        placeholder="Enter text"
                        onChange={this.userNameHandleChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup name="Enter password">
                    <Col componentClass={ControlLabel} sm={2}>
                      Password
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="password"
                        name="password"
                        value={this.state.value}
                        placeholder="password"
                        onChange={this.userNameHandleChange}
                      />
                    </Col>
                  </FormGroup>
                  <Button bsStyle="primary" onClick={this.submitData}>
                    Enter
                  </Button>
                  <FormControl.Feedback />
                  {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
                </Form>
              </Panel.Body>
            </Panel>
          </Row>
          <Row />
        </Grid>
      </Jumbotron>
    );
  }
}
