import React, { Component } from 'react';
import './UserInfoContainer.css';
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

componentDidMount() {
  Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/users/-LNVWR9kD2dvN8GLGFYE/`)
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
