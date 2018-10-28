import React, { Component } from 'react';
import './UserInfoContainer.css'
const Axios =require('axios');




class UserInfoContainer extends Component {

componentDidMount() {
  Axios.get('https://us-central1-ludusfire.cloudfunctions.net/Users'+'AIzaSyBgEdZYtz1niI-f2YKVI9eV9ue7BBhX7oY')
  .then((response) => {
    console.log(response)
  })
}


  render() {
    return (
      <container>
        <div className="borderuserInfo">
          {'Personal Information'}
          <br></br><br></br>
          <div className="userInfo">Name: {this.getName}</div>
          <br></br>
          <div className="userInfo">EMAIL: {''}</div>
          <br></br>
          <div className="userInfo">DOB: {''}</div>
        </div>
      </container>
    );
  }
}

export default UserInfoContainer;
