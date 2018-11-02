import React, { Component } from 'react';
import Notification from './Notification';

class NotificationList extends Component {
  createNotificationList = () => {
    let notifications = [];

    //for (let i = 0; i < notificationsList.length; i++) {
    for (let i = 0; i < 4; i++) {
      notifications.push(<div className="notBorder">{<Notification />}</div>);
    }

    return notifications;
  };

  render() {
    return (
      <div className="notificationsList">{this.createNotificationList()}</div>
    );
  }
}

export default NotificationList;
