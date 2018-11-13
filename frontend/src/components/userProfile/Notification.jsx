import React, { Component } from 'react';
import './notification.css';

class Notification extends Component {
  render() {
    return (
      <div>
        <container>
          <span className="notificationName">{'Notification!'}</span>
          <div className="notificationPreview">
            {'Notification preview here'}
          </div>
        </container>
      </div>
    );
  }
}

export default Notification;
