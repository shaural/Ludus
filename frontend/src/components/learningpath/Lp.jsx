import React, { Component } from 'react';
import './Lp.css';

class Lp extends Component {
  render() {
    return <div>{this.fetchData(this.props.LearningPathID)}</div>;
  }

  fetchData(LearningPathID) {
    var index = this.props.key;
    var obj = this.props.LearningPathID;
    console.log(index);
    console.log('in child', obj);
    //TODO: API Call for info on the lp from database
    if (!obj) {
      return <text>empty</text>;
    }
    if (this.props.LearningPathID.Classes) {
      return (
        <container>
          <span className="lpInfo">
            <span>
              {'LearningPath:'} {this.props.LearningPathID.Name}
            </span>
            <div>Topic: {this.props.LearningPathID.Topic} </div>
            <div>First Class: {this.props.LearningPathID.Classes[0]} </div>
          </span>
        </container>
      );
    }
    if (!this.props.LearningPathID.Classes) {
      return (
        <container>
          <span className="lpInfo">
            <span>
              {'LearningPath:'} {this.props.LearningPathID.Name}
            </span>
            <div>Topic: {this.props.LearningPathID.Topic} </div>
            <div>First Class: {'No Classes in LP'} </div>
          </span>
        </container>
      );
    }
  }
}

export default Lp;
