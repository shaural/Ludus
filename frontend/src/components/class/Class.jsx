import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Class.css';

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
    let classInfo = this.props.classInfo;

    //Class info parsing
    for (let key in classInfo) {
      if (key === 'Name') {
        const newTo = {
          pathname: `/class-menu/${this.props.classID}`,
          state: 'rip'
        };
        const name = (
          <div className="className" key={key}>
            <b>
              <Link to={newTo}>{classInfo[key]}</Link>
            </b>{' '}
            <br />
          </div>
        );
        vars = [name, ...vars];
      } else if (key === 'Tags') {
        let stringo = classInfo[key].substring(1, classInfo[key].length - 1);
        vars.push(
          <span className="detail" key={key}>
            {key + ': ' + stringo} &nbsp;
          </span>
        );
      } else if (key === 'Time') {
        vars.push(
          <div className="expandedDetail" key={key}>
            {'Time Estimate: ' + classInfo[key] + 'min'} <br />
          </div>
        );
      } else if (key === 'Content_type') {
        vars.push(
          <span className="detail" key={key}>
            {'Content Type: ' + classInfo[key]} &nbsp;
          </span>
        );
      } else if (key === 'Mature' && classInfo[key] === 'yes') {
        vars.push(
          <span className="mature" key={'maturity'}>
            &nbsp;
            {'Mature Content'}
            &nbsp;
          </span>
        );
      } else {
        vars.push(
          <span className="detail" key={key}>
            {key + ': ' + classInfo[key]} &nbsp;
          </span>
        );
      }
    }
    this.setState({ values: vars });
  };
}

export default Class;
