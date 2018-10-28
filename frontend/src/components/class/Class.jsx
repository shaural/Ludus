import React, { Component } from 'react';
import './Class.css';

class Class extends Component {
  render() {
    return <div>{this.fetchData(this.props.classID)}</div>;
  }

  fetchData(ClassID) {
    //TODO: API Call for info on the class from database
    //axios.get('https://us-central1-ludusfire.cloudfunctions.net/classes/', { params: this.props.classID }).then( function(response){ name, lpath, ctype, rating } = response.body;} );
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
