import React, { Component } from 'react';
import Axios from 'axios';

class LpDeleteBtn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      /*TODO: API Call and Styling*/
      <button onClick={this.removeLp.bind(this)}>Delete LP</button>
    );
  }

  removeLp() {
    console.log(this.props.lpID[0]);
    Axios.delete(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/${
        this.props.lpID[0]
      }`
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
