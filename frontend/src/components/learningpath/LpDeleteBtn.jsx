import React, { Component } from 'react';
import Axios from 'axios';

class LpDeleteBtn extends Component {
  render() {
    return (
      /*TODO: API Call and Styling*/
      <button onClick={this.removeLp}>Delete LP</button>
    );
  }

  removeLp() {
    Axios.delete(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/`,
      {
        /*this.props.lp_id*/
      }
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default LpDeleteBtn;
