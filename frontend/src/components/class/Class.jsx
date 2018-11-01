import React, { Component } from 'react';
import './Class.css';
var querystring = require('querystring');
const Axios = require('axios');

class Class extends Component {
  render() {
    return <div>{this.fetchData()}</div>;
  }

  fetchData() {
    //TODO: API Call for info on the class from database

    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/${
        this.props.classID
      }/info/`
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    return (
      <container>
        <span className="ClassInfo">
          <span>
            {/*Placeholder values for now*/ 'Example Class 101'} LP:{' '}
            {'ExamplePath'} Content Type: {'ExampleType'}{' '}
          </span>
          <div className="Rating">
            {' '}
            {'Example'}
            /5{' '}
          </div>
          <div>
            {' '}
            Tags: {'ExampleTags'} Comments: {'ExampleComments'}{' '}
          </div>
        </span>
      </container>
    );
  }
}

export default Class;
