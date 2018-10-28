import React, { Component } from 'react';
import './Class.css';
var querystring = require('querystring');
const Axios = require('axios');

class Class extends Component {
  render() {
    return <div>{this.fetchData(this.props.classID)}</div>;
  }

  fetchData(ClassID) {
    //TODO: API Call for info on the class from database
    const requestBody = {
      params: this.props.classID
    };
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    Axios.get(
      'https://us-central1-ludusfire.cloudfunctions.net/classes/info/',
      querystring.stringify(requestBody),
      config
    ).then(function(response) {
      console.log(response);
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
