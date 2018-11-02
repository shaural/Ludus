import React, { Component } from 'react';
import Header from './Header';
import UserInfoContainer from './UserInfoContainer';
import LpInfoContainer from './LpInfoContainer';
import NavBar from '../NavBar';
import './fullpage.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className="fullPage">
        <NavBar /> <Header userID={this.props.userID}/> <UserInfoContainer userID={this.props.userID} /> <LpInfoContainer userID={this.props.userID}/>
      </div>
    );
  }
}
export default ProfilePage;
