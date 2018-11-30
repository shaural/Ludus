import React, { Component } from 'react';
import Axios from 'axios';

class ClassRemoveButton extends Component {
  render() {
    return <button onClick={this.addBookmark}>Bookmark</button>;
  }

  addBookmark = () => {
    const requestBody = {
      bookmark_object: {
        id: this.props.itemID,
        type: this.props.itemType
      }
    };
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    Axios.patch(
      `https://us-central1-ludusfire.cloudfunctions.net/users/${
        this.props.classID
      }/bookmarks`,
      querystring.stringify(requestBody),
      config
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

export default ClassRemoveButton;
