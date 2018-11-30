import React, { Component } from 'react';
import './App.css';
// import custom component

import conf from './conf.js';
import 'firebase-auth';
import firebase from 'firebase';

import { PasswordReset } from './passwordreset/PasswordReset';
import ClassCreatePage from './components/createclass/ClassCreatePage';
import HomePage from './components/home/HomePage';
import LoginPage from './login/LoginPage';
import SignUpPage from './components/account/SignUpPage';
import ClasslistPage from './components/class/ClasslistPage';
import LpPage from './components/learningpath/LpPage';
import ProfilePage from './components/userProfile/ProfilePage';
import LearningPathCreatePage from './components/learningpath/LearningPathCreatePage';
import IllegalPath from './components/IllegalPath';
import { Route, Link, Switch } from 'react-router-dom';
import EditLP from './components/learning_path/edit_learning_path';
import ClassSearchPage from './components/class/ClassSearchPage';
import Dashboard from './components/navigation/Dashboard';
import LearningPathsEnrolledPage from './components/learningpath/LearningPathsEnrolledPage';
import NavBar from './components/NavBar';
import { AddInterests } from './components/interests/add-interests';
import { DeleteInterests } from './components/interests/delete-interests';
import LpOverview from './components/learningpath/studentlps/LpOverview';
import AllLps from './components/learningpath/studentlps/AllLps';

const Axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      email: ''
    };
  }

  getLoggedIn(){
    var user = firebase.auth().currentUser;
    var email;
    if(user){
      console.log("found logged in user!");
      this.setState({
        email: user.email
      });
    }
    return;
  }

  componentDidMount(){
    this.getLoggedIn();
    Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/users/getuid/${this.state.email}`)
    .then(({ data }) => {
      console.log("userid", data);
      this.setState({
          userID: data
      });
    });
  }

  render() {
    return (
      <div className="App">
        Working Navigation: &nbsp;
        <Link to="/">Home</Link> &nbsp;
        <Link to="/login">Login</Link> &nbsp;
        <Link to="/signup">Sign Up</Link> &nbsp;
        <Link to="/teacher-classlist">Your Classes</Link> &nbsp;
        <Link to="/student-lplist">Enrolled Learning Paths</Link> &nbsp;
        <Link to="/teacher-lplist">Learning Paths</Link> &nbsp;
        <Link to="/profile">User Profile</Link> &nbsp;
        <Link to="/class-search">Search Classes</Link> &nbsp;
        <Link to="/teacher-lp-create">Create Learning Path</Link> &nbsp;
        <Link to="/password-recovery">Reset Password</Link> &nbsp;
        <Link to="/interests">Add or remove interests</Link> &nbsp;
        <Link to="/all-lp-list">All LPs</Link> &nbsp;
        <Link
          to={{
            pathname: '/LPEdit',
            state: {
              lpid: '-LNWF1Itj0gydp4gt02V',
              name: 'John Doe',
              topic: 'Juggling',
              owner: 'Jack Smith'
            }
          }}
        >
          Edit learning_path
        </Link>{' '}
        &nbsp;
        {/* probably want to check if you're logged in or not for the home page */}
        <Link to="garbage">404</Link> &nbsp; userID:&nbsp;
        <input
          className="inLine"
          type="text"
          onChange={event => this.setState({ userID: event.target.value })}
        />
        {/*TODO: Use firebase.auth().currentUser to check if a user is logged in or not*/}
        {/* probably want to check if you're logged in or not for the home page? */}
        <NavBar userID={this.state.userID} />
        <Switch>
          <Route exact path="/student-lpview" component={LpOverview} />
          <Route exact path="/LPEdit" component={EditLP} />
          <Route exact path="/classCreate" component={ClassCreatePage} />
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/" component={Dash} /> */}
          {/*does not require userID*/}
          <Route exact path="/interests" component={AddInterests} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route exact path="/remove" component={DeleteInterests} />
          <Route
            path="/password-recovery"
            component={PasswordReset} /*placeholder*/
          />
          {/*requires userID*/}
          <Route
            path="/profile"
            render={props => (
              <ProfilePage {...props} userID={this.state.userID} />
            )}
          />
          <Route path="/class-search" component={ClassSearchPage} />
          {/*requires userID*/}
          <Route path="/dashboard" component={Dashboard} /*placeholder*/ />
          <Route
            path="/student-classlist"
            component={IllegalPath} /*placeholder*/
          />{' '}
          <Route
            path="/student-lplist"
            render={props => (
              <LearningPathsEnrolledPage
                {...props}
                userID={this.state.userID}
              />
            )} /*placeholder*/
          />
          <Route
            path="/teacher-class-create"
            component={IllegalPath} /*placeholder*/
          />
          <Route
            path="/teacher-class-edit"
            render={props => (
              <IllegalPath {...props} userID={this.state.userID} />
            )} /*placeholder*/
          />
          <Route
            path="/teacher-classlist"
            render={props => (
              <ClasslistPage {...props} userID={this.state.userID} />
            )}
          />
          <Route
            path="/teacher-lplist"
            render={props => <LpPage {...props} userID={this.state.userID} />}
          />
          <Route
            path="/all-lp-list"
            render={props => <AllLps {...props} userID={this.state.userID} />}
          />
          <Route
            path="/teacher-lp-create"
            render={props => (
              <LearningPathCreatePage {...props} userID={this.state.userID} />
            )}
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
