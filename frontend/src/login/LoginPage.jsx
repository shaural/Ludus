import React, { Component } from 'react';
import logo from '../logo.svg';
import { Login } from './Login';
class LoginPage extends Component {
  render() {
    return (
      <div>
        <p className="App-intro">
          Please enter your username and password to begin
        </p>
        <Login />
      </div>
    );
  }
}
export default LoginPage;
