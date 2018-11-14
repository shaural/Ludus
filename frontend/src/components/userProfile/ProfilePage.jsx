import React, { Component } from 'react';
import Header from './Header';
//import NotificationList from './NotificationList';
import UserInfoContainer from './UserInfoContainer';
import LpInfoContainer from './LpInfoContainer';
import './fullpage.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className="fullPage">
        <Header userID={this.props.userID} />{' '}
        <UserInfoContainer userID={this.props.userID} />{' '}
        <LpInfoContainer userID={this.props.userID} />
      </div>
    );
  }
}
export default ProfilePage;
