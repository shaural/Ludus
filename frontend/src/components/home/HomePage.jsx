import React, { Component } from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import Dashboard from '../navigation/Dashboard';

//import 'IllegalPath.css';

export default class HomePage extends Component {
  render() {
    if (this.props.userID !== '') {
      return <Dashboard />;
    } else {
      return (
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" /> <br />
            <h1 className="App-title">Welcome to Ludus</h1>
          </header>
          <p className="App-intro">
            Please <Link to="/signup">create an account</Link> to begin
          </p>
          <Link to="/login">I already have an account</Link>
        </div>
      );
    }
  }
}
