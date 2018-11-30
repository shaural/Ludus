import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import NotificationList from './NotificationList';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    if (this.props.userID === '') {
      return <Redirect to={'/'} />;
    } else {
      return (
        <div>
          <h1>Dashboard</h1> <br />
          <div className="DashWrapper">
            <div className="Learn">
              <Link to="/student-lplist">Enrolled Learning Paths</Link> <br />
              <Link to="/class-search">Search Classes</Link> <br />
              <Link to="/bookmarks">Bookmarks</Link> <br />
            </div>
            <div className="Teach">
              <Link to="/teacher-classlist">Your Classes</Link> <br />
              <Link to="/teacher-lplist">Learning Paths</Link> <br />
              <Link to="/teacher-lp-create">Create Learning Path</Link> <br />
            </div>
          </div>
          <div className="DashWrapper">
            <div className="Recommendations">a</div>
            <div className="Notifications">
              <NotificationList userID={this.props.userID} />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Dashboard;
