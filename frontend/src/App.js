import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import custom component
import { Login } from './login';
import { PasswordReset } from './passwordreset/PasswordReset';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { link } from 'fs';
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*router handling for stuff like the password reset page */}
        <BrowserRouter>
          <div>
            <div>
              <Route path="/passwordreset" component={PasswordReset} exact />
            </div>

            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Ludus</h1>
            </header>
            <p className="App-intro">
              Please enter your username and password to begin
            </p>

            <li>
              <Link to="/passwordreset">Reset Password</Link>
            </li>

            {/* This is how you render a custom component */}
            <Login />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
