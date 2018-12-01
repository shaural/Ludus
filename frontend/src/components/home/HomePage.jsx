import React, { Component } from 'react';
import logo from '../../logo.svg';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Dashboard from '../navigation/Dashboard';

//import 'IllegalPath.css';

export default class HomePage extends Component {
  render() {
    if (this.props.userID !== '') {
      return <Redirect to={'/dashboard'} />;
    } else {
      return (
        <Jumbotron>
          <h1>Welcome to Ludus</h1>
          <p>Click one of the buttons below to get started</p>
          <LinkContainer to="/signup">
            <Button bsStyle="primary">Create an account</Button>
          </LinkContainer>
          <LinkContainer to="/login">
            <Button>Log into an existing account</Button>
          </LinkContainer>
        </Jumbotron>
      );
    }
  }
}
