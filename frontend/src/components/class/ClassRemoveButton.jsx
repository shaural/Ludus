import React, { Component } from 'react';
import Axios from 'axios';
//import './Buttons.css';

class ClassRemoveButton extends Component {
  render() {
    return (
      /*TODO: API Call and Styling*/
      <button onClick={this.requestRemove}>Remove</button>
    );
  }

  requestRemove() {
    /* waiting on getClassID API
    Axios.delete('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: this.props.classID })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    */
    return false;
  }
}

export default ClassRemoveButton;
