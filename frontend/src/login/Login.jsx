import React, { checkboxes, Checkbox, Component } from 'react';
import conf from '../conf.js';
import 'firebase-auth';
import firebase from 'firebase';
import {
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
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

  alternativeSignIn() {}

  submitData() {
    let uname = this.state.username;
    let pwd = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(uname, pwd)
      .then(response => {
        alert('Logged in');
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
      <Form horizontal>
        <FormGroup name="Enter name">
          <ControlLabel>Email address: </ControlLabel>
          <FormControl
            type="text"
            name="username"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.userNameHandleChange}
          />
        </FormGroup>

        <FormGroup name="Enter password">
          <ControlLabel>Password: </ControlLabel>
          <FormControl
            type="password"
            name="password"
            value={this.state.value}
            placeholder="password"
            onChange={this.userNameHandleChange}
          />
        </FormGroup>
        <Button bsStyle="primary" onClick={this.submitData}>
          Enter
        </Button>
        <FormControl.Feedback />
        {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
      </Form>
    );
  }
}

export default class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));
  }

  render() {
    return (
      <React.Fragment>
        {checkboxes.map(item => (
          <label key={item.key}>
            {item.name}
            <Checkbox
              name={item.name}
              checked={this.state.checkedItems.get(item.name)}
              onChange={this.handleChange}
            />
          </label>
        ))}
      </React.Fragment>
    );
  }
}
