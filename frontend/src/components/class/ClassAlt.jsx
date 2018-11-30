import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Class.css';

class ClassAlt extends Component {
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
    let key = '';
    for (let index in classInfo) {
      if (index % 2 == 0) {
        key = classInfo[index];
      } else {
        if (key === 'Name') {
          const newTo = {
            pathname: `/class-menu/${this.props.classID}`,
            state: 'rip'
          };
          const name = (
            <div className="className" key={key}>
              <b>
                <Link to={newTo}>{classInfo[index]}</Link>
              </b>{' '}
              <br />
            </div>
          );
          vars = [name, ...vars];
        } else if (key === 'Tags') {
          let stringo = classInfo[index].substring(
            1,
            classInfo[index].length - 1
          );
          vars.push(
            <span className="detail" key={key}>
              {key + ': ' + stringo} &nbsp;
            </span>
          );
        } else if (key === 'Time') {
          vars.push(
            <div className="expandedDetail" key={key}>
              {'Estimate: ' + classInfo[index] + 'min'} <br />
            </div>
          );
        } else if (key === 'Content_type') {
          vars.push(
            <span className="detail" key={key}>
              {'Content Type: ' + classInfo[index]} &nbsp;
            </span>
          );
        } else if (key === 'Mature' && classInfo[index] === 'yes') {
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
              {key + ': ' + classInfo[index]} &nbsp;
            </span>
          );
        }
      }
    }
    this.setState({ values: vars });
  };
}

export default ClassAlt;
