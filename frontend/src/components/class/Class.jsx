import React, { Component } from 'react';
import './Class.css';
const Axios = require('axios');

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [] };
  }
  render() {
    return <div className="ClassInfo">{this.state.values}</div>;
  }

  componentDidMount = () => {
    let vars = [];
    //Not scalable yet for sanity's sake atm
    for (let key in this.props.classInfo) {
      if (key === 'Name') {
        const name = (
          <div className="className" key={key}>
            <b>{this.props.classInfo[key]}</b> <br />
          </div>
        );
        vars = [name, ...vars];
      } else if (key === 'Tag') {
        vars.push(
          <span className="detail" key={key}>
            {key + ': ' + this.props.classInfo[key]} &nbsp;
          </span>
        );
      } else if (key === 'Content_type') {
        vars.push(
          <span className="detail" key={key}>
            {'Content Type: ' + this.props.classInfo[key]} &nbsp;
          </span>
        );
      } else if (key === 'Mature' && this.props.classInfo[key] === 'yes') {
        vars.push(
          <span className="mature" key={'Tags'}>
            &nbsp;
            {'Mature Content'}
            &nbsp;
          </span>
        );
      } else {
        vars.push(
          <span className="detail" key={key}>
            {key + ': ' + this.props.classInfo[key]} &nbsp;
          </span>
        );
      }
    }
    this.setState({ values: vars });
  };
}

export default Class;
