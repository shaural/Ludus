import React, { Component } from 'react';


class TeacherFollowing extends Component {
  render() {
    return <div>{this.fetchData(this.props.TeacherID)}</div>;
  }

  fetchData(TeacherID) {
    //TODO: API Call for info on the class from database
    //axios.get('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: this.props.classID }).then( function(response){ name, lpath, ctype, rating } = response.body;} );
    return (
      <li>{}</li>
    );
  }
}

export default TeacherFollowing;
