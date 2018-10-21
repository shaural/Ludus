import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
// import custom component
import HomePage from './components/home/HomePage';
import LoginPage from './login/LoginPage';
import SignUpPage from './components/account/SignUpPage';
import ClasslistPage from './components/class/ClasslistPage';
import IllegalPath from './components/IllegalPath';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* This is how you render a custom component */}
        Working Navigation: &nbsp;
        <Link to="/">Home</Link> &nbsp;
        <Link to="/login">Login</Link> &nbsp;
        <Link to="/signup">Sign Up</Link> &nbsp;
        <Link to="/tclasslist">Your Classes</Link> &nbsp;
        <Link to="garbage">404</Link> &nbsp;
        {/* probably want to check if you're logged in or not for the home page */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/" component={Dash} /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/tclasslist" component={ClasslistPage} />
          <Route component={IllegalPath} />
        </Switch>
      </div>
    );
  }
}
export default App;
