import React, { Component } from 'react';
import './App.css';
import conf from './conf.js';
import 'firebase-auth';
import firebase from 'firebase';
// import custom component

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
import BookmarkMenu from './components/bookmarks/BookmarkMenu';
import ClassMenu from './components/class/ClassMenu';

const Axios = require('axios');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      email: ''
    };
  }

  getLoggedIn() {
    var user = firebase.auth().currentUser;
    var email;
    if (user) {
      console.log('found logged in user!');
      this.setState({
        email: user.email
      });
    }
    return;
  }

  componentDidMount() {
    this.getLoggedIn();
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/users/getuid/${
        this.state.email
      }`
    ).then(({ data }) => {
      console.log('userid', data);
      this.setState({
        userID: data
      });
    });
  }

  render() {
    return (
      <div className="App">
        {/*TODO: Use firebase.auth().currentUser to check if a user is logged in or not*/}
        {/* probably want to check if you're logged in or not for the home page? */}
        <NavBar userID={this.state.userID} />
        <Switch>
          <Route exact path="/student-lpview" component={LpOverview} />
          <Route exact path="/classCreate" component={ClassCreatePage} />
          <Route exact path="/LPEdit" component={EditLP} />
          <Route
            exact
            path="/"
            render={props => (
              <HomePage {...props} userID={this.state.userID} />
            )} /*placeholder*/
          />
          {/* <Route path="/" component={Dash} /> */}
          {/*does not require userID*/}
          <Route exact path="/interests" component={AddInterests} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/remove" component={DeleteInterests} />
          <Route
            exact
            path="/password-recovery"
            component={PasswordReset} /*placeholder*/
          />
          {/*requires userID*/}
          <Route
            exact
            path="/profile"
            render={props => (
              <ProfilePage {...props} userID={this.state.userID} />
            )}
          />
          <Route exact path="/class-search" component={ClassSearchPage} />
          {/*requires userID*/}
          <Route
            exact
            path="/dashboard"
            render={props => (
              <Dashboard {...props} userID={this.state.userID} />
            )}
          />
          <Route
            exact
            path="/bookmarks"
            render={props => (
              <BookmarkMenu {...props} userID={this.state.userID} />
            )} /*placeholder*/
          />
          <Route
            exact
            path="/student-classlist"
            component={IllegalPath} /*placeholder*/
          />{' '}
          <Route
            exact
            path="/student-lplist"
            render={props => (
              <LearningPathsEnrolledPage
                {...props}
                userID={this.state.userID}
              />
            )} /*placeholder*/
          />
          <Route
            exact
            path="/class-menu/:classID"
            render={props => (
              <ClassMenu {...props} userID={this.state.userID} />
            )}
          />
          <Route
            exact
            path="/teacher-class-create"
            component={IllegalPath} /*placeholder*/
          />
          <Route
            exact
            path="/teacher-class-edit"
            render={props => (
              <IllegalPath {...props} userID={this.state.userID} />
            )} /*placeholder*/
          />
          <Route
            exact
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
