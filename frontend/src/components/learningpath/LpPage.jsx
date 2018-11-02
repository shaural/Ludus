import React, { Component } from 'react';
import Lp from './Lp';
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
      data: []
    };
  }

	componentDidMount() {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/search/?owner=${
        this.props.userID
      }`
    ).then(({ data }) => {
      console.log(data);
      this.setState({
        length: data.length,
        data: data
      });
    });
  }

  createLpPage = () => {
    //let lpIDList = []
    //TODO: Call API for lpIDs
    let learningPaths = [];
    var y = this.state.length;
    //for (let i = 0; i < lpIDList.length; i++) {
    for (let i = 0; i < y; i++) {
      learningPaths.push(
        <div className="lpObject">
          {<Lp LearningPathID={this.state.data} i={i} />}
          <span className="Placeholder">
            {<LpEditBtn />} <text> </text> {<LpDeleteBtn lpID={this.state.data[0]}/>}
          </span>
        </div>
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
