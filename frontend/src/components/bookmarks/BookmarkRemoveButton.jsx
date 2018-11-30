import React, { Component } from 'react';
import Axios from 'axios';

class BookmarkRemoveButton extends Component {
  render() {
    return <button onClick={this.requestRemove}>Remove</button>;
  }

  requestRemove = () => {
    Axios.delete(
      `https://us-central1-ludusfire.cloudfunctions.net/users/${
        this.props.userID
      }/bookmarks/${hi}`
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    return false;
  };
}

export default BookmarkRemoveButton;
