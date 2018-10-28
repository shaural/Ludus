import React, { Component } from 'react';
import FollowBtn from './FollowBtn';
import UnfollowBtn from './UnfollowBtn';
import NotificationList from './NotificationList';
import profilePic from './profilePic.jpg';
import './header.css';

class Header extends Component {
  render() {
    return <div>{this.fetchData(this.props.userID)}</div>;
  }

  fetchData(userID) {
    //TODO: API Call for info on the class from database
    //axios.get('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: this.props.classID }).then( function(response){ name, lpath, ctype, rating } = response.body;} );
    return (
      <container>
        <span className="headerBox">
          <span className="ProfileBox">
              <img class="image" src={profilePic}/>
          </span>
          <div className="nameText">
            {"Sample Name"}
          </div>
          <div className="followerBtn">
          {<FollowBtn />}
          </div>
          <div className="UnfollowerBtn">
          {<UnfollowBtn />}
          </div>
          <div className="notifications">
            {<NotificationList />}
          </div>
        </span>
      </container>
    );
  }
}

export default Header;
