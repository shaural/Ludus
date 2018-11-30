import React, { Component } from 'react';
import Notification from './Notification';
import '../class/ClassList.css';
const Axios = require('axios');

export default class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = { notificationList: [] };
  }

  componentDidMount = () => {
    this.fetchNotifications();
    return;
  };

  fetchNotifications = () => {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/notifications/${
        this.props.userID
      }`
    )
      .then(response => {
        let notlist = [];
        console.log(response);
        for (let entry in response.data) {
          notlist.push(<Notification notInfo={response.data[entry]} />);
        }
        this.setState({ notificationList: notlist });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(this.submitSearch);
    return;
  };

  render() {
    return <div>{this.state.notificationList}</div>;
  }
}
