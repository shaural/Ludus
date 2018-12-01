import React, { Component } from 'react';
import './Lp.css';

class LearningPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Owner: '',
      Mature: 'no',
      classlist: []
    };
  }

  render() {
    return <div>{this.displayData()}</div>;
  }

  displayData = () => {
    this.props.LearningPathID;
    let name, owner, topic, mature, classy;
    for (let key in this.props.LearningPathInfo) {
      if (key === 'Name') {
        name = this.props.LearningPathInfo[key];
      } else if (key === 'Topic') {
        topic = this.props.LearningPathInfo[key];
      } else if (key === 'Owner') {
        owner = this.props.LearningPathInfo[key];
      } else if (key === 'Mature') {
        mature = this.props.LearningPathInfo[key];
      } else if (key === 'Class_List') {
        classy = this.props.LearningPathInfo[key][0];
      }
    }
    if (!classy) {
      classy = 'No Classes';
    }
    let learningPath = (
      <span>
        <span className="lpInfo">
          <span>
            {'LearningPath:'} {name}
          </span>
          <div>Topic: {topic} </div>
          <div>First Class: {classy} </div>
        </span>
      </span>
    );

    return learningPath;
  };

  fetchData(LearningPathID) {
    var index = this.props.i;
    var obj = this.props.LearningPathID[index];
    console.log(index);
    console.log('in child', obj);
    //TODO: API Call for info on the lp from database
    if (!obj) {
      return <text>empty</text>;
    }
    if (this.props.LearningPathID[index][1].Classes) {
      return (
        <span>
          <span className="lpInfo">
            <span>
              {'LearningPath:'} {this.props.LearningPathID[index][1].Name}
            </span>
            <div>Topic: {this.props.LearningPathID[index][1].Topic} </div>
            <div>
              First Class: {this.props.LearningPathID[index][1].Classes[0]}{' '}
            </div>
          </span>
        </span>
      );
    }
    if (!this.props.LearningPathID[index][1].Classes) {
      return (
        <span>
          <span className="lpInfo">
            <span>
              {'LearningPath:'} {this.props.LearningPathID[index][1].Name}
            </span>
            <div>Topic: {this.props.LearningPathID[index][1].Topic} </div>
            <div>First Class: {'No Classes in LP'} </div>
          </span>
        </span>
      );
    }
  }
}

export default LearningPath;
