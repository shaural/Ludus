import React, { Component } from 'react';
import './App.css';
// import custom component

import { PasswordReset } from './passwordreset/PasswordReset';
import HomePage from './components/home/HomePage';
import LoginPage from './login/LoginPage';
import SignUpPage from './components/account/SignUpPage';
import ClasslistPage from './components/class/ClasslistPage';
import LpPage from './components/learningpath/LpPage';
import ProfilePage from './components/userProfile/ProfilePage';
import IllegalPath from './components/IllegalPath';
import {Route, Link, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        Working Navigation: &nbsp;
        <Link to="/">Home</Link> &nbsp;
        <Link to="/login">Login</Link> &nbsp;
        <Link to="/signup">Sign Up</Link> &nbsp;
        <Link to="/teacher-classlist">Your Classes</Link> &nbsp;
        <Link to="/teacher-lplist">Learning Paths</Link> &nbsp;
        <Link to="/profile">User Profile</Link> &nbsp;
        <Link to="garbage">404</Link> &nbsp;
        {/* probably want to check if you're logged in or not for the home page? */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/" component={Dash} /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/profile" component={ProfilePage} /*placeholder*/ />
          <Route
            path="/password-recovery"
            component={PasswordReset} /*placeholder*/
          />
          <Route path="/student-dash" component={IllegalPath} /*placeholder*/ />
          <Route
            path="/student-classlist"
            component={IllegalPath} /*placeholder*/
          />
          <Route
            path="/student-lplist"
            component={IllegalPath} /*placeholder*/
          />
          <Route path="/teacher-dash" component={IllegalPath} /*placeholder*/ />
          <Route
            path="/teacher-class-create"
            component={IllegalPath} /*placeholder*/
          />
          <Route
            path="/teacher-class-edit"
            component={IllegalPath} /*placeholder*/
          />
          <Route path="/teacher-classlist" component={ClasslistPage} />
          <Route
            path="/teacher-lplist"
            component={LpPage} /*placeholder*/
          />
          <Route
            path="/teacher-lp-create"
            component={IllegalPath} /*placeholder*/
          />
          <Route
            path="/teacher-lp-edit"
            component={IllegalPath} /*placeholder*/
          />
          <Route component={IllegalPath} />
        </Switch>
      </div>
    );
  }
}
export default App;
