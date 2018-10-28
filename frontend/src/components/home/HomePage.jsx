import React, { Component } from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

//import 'IllegalPath.css';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ludus</h1>
        </header>
        <p className="App-intro">Please sign up to begin</p>
        <Link to="/signup">Sign Up</Link> &nbsp;
        <Link to="/login">I already have an account</Link>
      </div>
    );
  }
}
