import React, { Component } from 'react';
import LpNew from './LpNew';


const Axios = require('axios');

class AllLps extends Component {
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
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/search`
    ).then(({ data }) => {
      console.log(Object.keys(data));
      this.setState({
        length: 10,
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
    for (var key in this.state.data) {
      console.log(key);
      learningPaths.push(
        <div className="lpObject">
          {<LpNew LearningPathID={key} />}
          <span className="Placeholder">
          </span>
        </div>
      );
    }

		if(y=0){
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
        </div>
        <div className="LpPage">{this.createLpPage()}</div>;
      </div>
    );
  }
}

export default AllLps;
