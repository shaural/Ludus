import React, { Component } from 'react';
import Lp from './Lp';
//import LpDropButton from './LpDropButton';
//import './Forms.css';
//import './ClassList.css';
const Axios = require('axios');

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: this.props.userID /*-LNVWR9kD2dvN8GLGFYE*/,
      update: '',
      pathIDList: [],
      pathInfo: []
    };
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount = () => {
    this.createPathList();
  };

  fetchBookmarks = () => {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/users/${
        this.props.userID
      }/student/learningPaths`
    ).then();
  };

  submitSearch = () => {
    if (this.state.pathIDList === undefined || !this.state.pathIDList)
      return <h2>No Learning Paths...</h2>;
    let paths = [];
    for (let id in this.state.pathIDList) {
      paths.push(
        <div className="LpObject" key={id}>
          {<Lp LearningPathID={this.state.pathIDList[id]} />}
          {/*<LpDropButton onClick={(event) => this.setState({ update: '' })} classID={this.state.classIDList[id]} />*/}
        </div>
      );
    }
    return paths;
  };

  render() {
    return (
      <div>
        <br /> <br />
        <div className="ClassForm">{this.submitSearch()}</div>
      </div>
    );
  }
}

export default ClassList;
