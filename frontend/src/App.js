import React, { Component } from 'react';
import './App.css';
// import custom component
import HomePage from './components/home/HomePage';
import LoginPage from './login/LoginPage';
import SignUpPage from './components/account/SignUpPage';
import ClasslistPage from './components/class/ClasslistPage';
import IllegalPath from './components/IllegalPath';

//from tutorial
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

// commented out because CheckBox wasn't working on the page...don't delete
// import { CheckboxContainer } from './login';
/* Don't really know what's going on with the Reset and fakeAuth components so just commenting for now so that it will compile on my end
const AuthExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/reset">Public Page</Link>
        </li>
      </ul>
      <PrivateRoute path="/reset" component={Reset} />
    </div>
  </Router>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )}
  />
);
*/
class App extends Component {
  render() {
    return (
      <div className="App">
        Working Navigation: &nbsp;
        <Link to="/">Home</Link> &nbsp;
        <Link to="/login">Login</Link> &nbsp;
        <Link to="/signup">Sign Up</Link> &nbsp;
        <Link to="/teacher-classlist">Your Classes</Link> &nbsp;
        <Link to="garbage">404</Link> &nbsp;
        {/* probably want to check if you're logged in or not for the home page */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/" component={Dash} /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/profile" component={IllegalPath} /*placeholder*/ />
          <Route
            path="/password-recovery"
            component={IllegalPath} /*placeholder*/
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
        {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ludus</h1>
        </header>
        <p className="App-intro">
          Please enter your username and password to begin
        </p>
  
        {/* This is how you render a custom component */}
        {/*}
        <Login />
        {/* <CheckboxContainer /> */}
      </div>
    );
  }
}
export default App;
