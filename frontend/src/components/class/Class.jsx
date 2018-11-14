import React, { Component } from 'react';
import './Class.css';
const Axios = require('axios');

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [], present: [1, 1, 1, 1, 1] };
  }
  render() {
    return <div>{this.fetchData()}</div>;
  }
  componentDidMount = () => {
    let vars = [];
    let pres = this.state.present;
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
      } else {
        vars.push(
          <span className="detail" key={key}>
            {key + ': ' + this.props.classInfo[key]} &nbsp;
          </span>
        );
      }
    } /*
          if (!response.data.Name) {
            pres[0] = 0;
          } else {
            vars.push(
              <div className="className" key={'Name'}>
                <b>{response.data.Name}</b> <br />
              </div>
            );
          }
        if (!response.data.Owner) {
          pres[1] = 0;
        } else {
          vars.push(
            <span className="detail" key={'Owner'}>
              {'Owner: ' + response.data.Owner}
              &nbsp;
            </span>
          );
        }
        if (!response.data.Content_Type) {
          pres[2] = 0;
        } else {
          vars.push(
            <span className="detail" key={'Content Type'}>
              {'Content Type: ' + response.data.Content_Type}
              &nbsp;
            </span>
          );
        }
        if (!response.data.Tag) {
          pres[3] = 0;
        } else {
          vars.push(
            <span className="detail" key={'Tags'}>
              {'Tags: ' + response.data.Tag}
              &nbsp;
            </span>
          );
        }
        if (!response.data.Mature) {
          pres[4] = 0;
        } else if (response.data.Mature === 'yes') {
          vars.push(
            <span className="mature" key={'Tags'}>
              &nbsp;
              {'Mature Content'}
              &nbsp;
            </span>
          );
        }*/
    this.setState({ values: vars });
  };
  fetchData = () => {
    //TODO: API Call for info on the class from database

    return (
      <span>
        <span className="ClassInfo">{this.state.values}</span>
      </span>
    );
  };
}

export default Class;
