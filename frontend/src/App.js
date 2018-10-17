import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import custom component
import { Login } from './login';

//from tutorial
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

// commented out because CheckBox wasn't working on the page...don't delete
// import { CheckboxContainer } from './login';
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
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ludus</h1>
        </header>
        <p className="App-intro">
          Please enter your username and password to begin
        </p>

        {/* This is how you render a custom component */}
        <Login />
        {/* <CheckboxContainer /> */}
      </div>
    );
  }
}
export default App;
