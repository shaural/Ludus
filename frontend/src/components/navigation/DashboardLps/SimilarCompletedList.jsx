import React, { Component } from 'react';
import './LpBlocks.css';
const Axios = require('axios');

class SimilarCompletedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      data: ''
    };
  }

  componentDidMount() {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/student/${
        this.props.userID
      }/similarCompleted`
    ).then(({ data }) => {
      console.log(data);
      this.setState({
        data: data,
        length: data.length
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
        <div className="BlockBorder">
          <div>Name: {this.state.data[i][1].Name}</div>
          <div>Topic: {this.state.data[i][1].Topic}</div>
        </div>
      );
    }
    return learningPaths;
  };

  render() {
    return (
      <div>
        <p> {this.createLpPage()} </p>
      </div>
    );
  }
}

export default SimilarCompletedList;
