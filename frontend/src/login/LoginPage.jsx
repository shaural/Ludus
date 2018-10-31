import React, { Component } from 'react';
import { Login } from './Login';
import { Link } from 'react-router-dom';
class LoginPage extends Component {
  render() {
    return (
      <div>
        <p className="App-intro">
          Please enter your username and password to begin
        </p>
        <Login />
        <Link to="/signup">Don't have an account?</Link> &nbsp;
        <Link to="/password-recovery">Forgot your password?</Link> &nbsp;
      </div>
    );
  }
}
export default LoginPage;
