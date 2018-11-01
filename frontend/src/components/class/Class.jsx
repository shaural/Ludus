import React, { Component } from 'react';
import './Class.css';
var querystring = require('querystring');
const Axios = require('axios');

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [], present: [1, 1, 1, 1] };
  }
  render() {
    return <div>{this.fetchData()}</div>;
  }
  componentDidMount = () => {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/${
        this.props.classID
      }/info/`
    )
      .then(response => {
        let vars = [];
        let pres = this.state.present;

        //Not scalable yet for sanity's sake atm
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
            </span>
          );
        }
        if (!response.data.Content_Type) {
          pres[2] = 0;
        } else {
          vars.push(
            <span className="detail" key={'Content Type'}>
              {'Content Type: ' + response.data.Content_Type}
            </span>
          );
        }
        if (!response.data.Tag) {
          pres[3] = 0;
        } else {
          vars.push(
            <span className="detail" key={'Tags'}>
              {'Tags: ' + response.data.Tag}
            </span>
          );
        }
        this.setState({ values: vars });
        this.setState({ present: pres });
      })
      .catch(function(error) {
        console.log(error);
      });
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
