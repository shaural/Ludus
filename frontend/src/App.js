import React, { Component } from 'react';
import './App.css';
// import custom component

import { PasswordReset } from './passwordreset/PasswordReset';
import ClassCreatePage from './components/createclass/ClassCreatePage'
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
import LearningPathsEnrolledPage from './components/learningpath/LearningPathsEnrolledPage';
import NavBar from './components/NavBar';
import { AddInterests } from './components/interests/add-interests';
import Dashboard from './components/navigation/Dashboard';
import { DeleteInterests } from './components/interests/delete-interests';
import BookmarkMenu from './components/bookmarks/BookmarkMenu';
import ClassMenu from './components/class/ClassMenu';
import AllLps from './components/learningpath/studentlps/AllLps';
import LpOverview from './components/learningpath/studentlps/LpOverview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: ''
    };
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
        <Link to="/all-lp-list">All Lps</Link> &nbsp;
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
          <Route exact path="/classCreate" component={ClassCreatePage} />
          {/*requires userID*/}
          <Route
            exact
            path="/dashboard"
            render={props => (
              <Dashboard {...props} userID={this.state.userID}
          />)}
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
            path="/all-lp-list"
            render={props => <AllLps {...props} userID={this.state.userID} /> }
          />
          <Route
            exact
            path="/student-lpview"
            component={LpOverview}
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
            exact
            path="/teacher-lplist"
            render={props => <LpPage {...props} userID={this.state.userID} />}
          />
          <Route
            exact
            path="/teacher-lp-create"
            render={props => (
              <LearningPathCreatePage {...props} userID={this.state.userID} />
            )}
          />
          <Route
            exact
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
