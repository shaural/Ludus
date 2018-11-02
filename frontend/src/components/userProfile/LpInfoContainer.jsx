import React, { Component } from 'react';
import LpPage from '../learningpath/LpPage';
import './LpInfoContainer.css'

const Axios =require('axios');
class LpInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      T_Following: 0,
      data: []
    }
  }

  createTeacherlist = () => {
    //let classIDList = []
    //waiting on API call for classIDs
    //axios.get('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: /*produce userID from somewhere*/ }).then( function(response){});

    let teachers = [];

    //for (let i = 0; i < classIDList.length; i++) {
    for (let i = 0; i < this.state.T_Following; i++) {
      teachers.push(
        <li> {this.state.data.Student.T_Following[i]} </li>
      );
    }
    return teachers;
  };

  componentDidMount() {
    Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/users/${this.props.userID}/`)
    //Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/users/{uid}/`) getting logged in state in progress
    .then(({ data }) => {
      console.log(data)
      this.setState({
        T_Following: data.Student.T_Following.length,
        data: data
      });
    })
  }

  render() {
    return (
      <span>
        <div className="borderLpInfo">
          {'Following'}
        <ol>
          {this.createTeacherlist()}
        </ol>
        </div>
      </span>
    );
  }
}

export default LpInfoContainer;
