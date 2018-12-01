import React, { Component } from 'react';
import LearningPath from './LearningPath';
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

  createPathList = () => {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/users/${
        this.props.userID
      }/student/learningPaths`
    )
      .then(response => {
        console.log(response);
        let IDList = [];
        let InfoList = [];
        for (let id in response.data) {
          if (id != 'message') {
            for (let sid in response.data[id]) {
              for (let did in response.data[id][sid]) {
                console.log(did);
                console.log(response.data[id][sid][did]);
                IDList.push(did);
                InfoList.push(response.data[id][sid][did]);
              }
            }
          }
        }
        this.setState({ pathIDList: IDList, pathInfo: InfoList });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(this.submitSearch);
    return;
  };

  submitSearch = () => {
    if (this.state.pathIDList === undefined || !this.state.pathIDList)
      return <h2>No Learning Paths...</h2>;
    let paths = [];
    for (let id in this.state.pathIDList) {
      console.log(this.state.pathInfo[id]);
      paths.push(
        <div className="LpObject" key={id}>
          {
            <LearningPath
              LearningPathID={this.state.pathIDList[id]}
              LearningPathInfo={this.state.pathInfo[id]}
            />
          }
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
