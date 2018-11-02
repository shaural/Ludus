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

  async componentDidMount() {
    await Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/search/?owner=${
        this.props.userID
      }`
    ).then(({ data }) => {
      console.log('hi', data);
      this.setState({
        data
      });
    });
  }

  createLpPage = () => {
    //let lpIDList = []
    //TODO: Call API for lpIDs
    let learningPaths = [];
    var y = this.state.data;
    console.log(y);
    console.log('state', this.state);
    Object.keys(this.state.data).forEach(e => {
      console.log(this.state.data[e]);
      learningPaths.push(
        <div className="lpObject">
          {<Lp LearningPathID={this.state.data[e]} />}
          <span className="Placeholder">
            {<LpEditBtn />} <text> </text> {<LpDeleteBtn />}
          </span>
        </div>
      );
    });

    //for (let i = 0; i < lpIDList.length; i++) {
    /*for (let i =0;i<1;i++) {
      learningPaths.push(
        <div className="lpObject">
          {<Lp LearningPathID={y[i]} key={i} />}
          <span className="Placeholder">
            {<LpEditBtn />} <text> </text> {<LpDeleteBtn />}
          </span>
        </div>
      );
    }*/

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
