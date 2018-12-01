import React, { Component } from 'react';
import LearningPath from './LearningPath';
import LpCreateBtn from './LpCreateBtn';
import LpDeleteBtn from './LpDeleteBtn';
import LpEditBtn from './LpEditBtn';
import LpFilter from './LpFilter';
import './lpPage.css';

const Axios = require('axios');

class LpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 1,
      LearningPath: '',
      data: [],
      pathIDList: [],
      pathInfo: []
    };
  }

  componentDidMount() {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/search/?owner=${
        this.props.userID
      }`
    )
      .then(response => {
        console.log(response);
        let IDList = [];
        let InfoList = [];
        for (let id in response.data) {
          IDList.push(response.data[id][0]);
          InfoList.push(response.data[id][1]);
        }
        this.setState({ pathIDList: IDList, pathInfo: InfoList });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  createLpPage = () => {
    //let lpIDList = []
    //TODO: Call API for lpIDs
    let learningPaths = [];
    var y = this.state.pathIDList.length;
    //for (let i = 0; i < lpIDList.length; i++) {
    for (let id in this.state.pathIDList) {
      learningPaths.push(
        <div className="lpObject">
          {
            <LearningPath
              LearningPathID={this.state.pathIDList[id]}
              LearningPathInfo={this.state.pathInfo[id]}
            />
          }
          <span className="Placeholder">
            {<LpEditBtn LearningPathID={this.state.pathIDList[id]} />}
            {<LpDeleteBtn lpID={this.state.pathIDList[id]} />}
          </span>
        </div>
      );
    }

    if ((y = 0)) {
      learningPaths.push(
        <text>"No Learning Paths enrolled or created yet :(" </text>
      );
    }
    return learningPaths;
  };

  render() {
    return (
      <div>
        <div>
          {' '}
          {<LpCreateBtn />} {<LpFilter />}
        </div>
        <div className="LpPage">{this.createLpPage()}</div>;
      </div>
    );
  }
}

export default LpPage;
