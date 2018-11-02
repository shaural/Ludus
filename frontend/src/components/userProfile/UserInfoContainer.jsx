import React, { Component } from 'react';
import './UserInfoContainer.css';
import conf from '../../conf.js';
import 'firebase-auth';
import firebase from 'firebase';
const Axios =require('axios');



class UserInfoContainer extends React.Component {
constructor(props){
  super(props);
  this.state = {
    Name: 'nametest',
    Email: 'emailtest',
    DoB: 'dobtest',
    data: []
  }
}

//get Logged in State, in progress
/*getUser(){
  var uid;
  var user = firebase.auth().currentUser;
  if(user){
    uid = user.uid;
    console.log(uid);
  }else {
    console.log("no uid found");
    uid = "-LNVWR9kD2dvN8GLGFYE"
  }

}

*/


componentDidMount() {
  //this.getUser();
  Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/users/${this.props.userID}/`)
  //Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/users/{uid}/`) getting logged in state in progress
  .then(({ data }) => {
    console.log(data);
    this.setState({
      Name: data.Name,
      Email: data.Email,
      DoB: data.DoB
    });
  })
}


  render() {
    return (
      <container>
        <div className="borderuserInfo">
          {'Personal Information'}
          <br></br><br></br>
          <div className="userInfo">Name: {this.state.Name}</div>
          <br></br>
          <div className="userInfo">EMAIL: {this.state.Email}</div>
          <br></br>
          <div className="userInfo">DOB: {this.state.DoB}</div>
        </div>
      </container>
    );
  }
}

export default UserInfoContainer;
