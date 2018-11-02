import React, { Component } from 'react';
import './App.css';
// import custom component

import { PasswordReset } from './passwordreset/PasswordReset';
import HomePage from './components/home/HomePage';
import LoginPage from './login/LoginPage';
import SignUpPage from './components/account/SignUpPage';
import ClasslistPage from './components/class/ClasslistPage';
import IllegalPath from './components/IllegalPath';
import EditLP from './components/learning_path/edit_learning_path';
import { Route, Link, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        Working Navigation: &nbsp;
        <Link to="/">Home</Link> &nbsp;
        <Link to="/login">Login</Link> &nbsp;
        <Link to="/signup">Sign Up</Link> &nbsp;
        <Link to="/teacher-classlist">Your Classes</Link> &nbsp;
        <Link to="/password-recovery">Reset Password</Link> &nbsp;
        <Link to="garbage">404</Link> &nbsp;

        <Link
          to={{
            pathname: '/LPEdit',
            state: { name: 'John Doe', topic: 'Juggling', owner: 'Jack Smith' }
          }}
        >
          Edit learning_path
        </Link>{' '}
        &nbsp;
        {/* probably want to check if you're logged in or not for the home page */}
        <Switch>
          <Route exact path="/LPEdit" component={EditLP} />
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/" component={Dash} /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/profile" component={IllegalPath} /*placeholder*/ />
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
            component={IllegalPath} /*placeholder*/
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
