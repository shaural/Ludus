import React, { Component } from 'react';
import './Class.css';

class Class extends Component {
  render() { 
    return (
      <div>
        { this.fetchData( this.props.classID ) }
      </div>
    );
  }

  fetchData(ClassID) {
    //TODO: API Call for info on the class from database
    return (
      <container>
        <span className="ClassInfo">
          <span>{ /*Placeholder values for now*/ "Example Class 101" }  LP: { "ExamplePath" }  Content Type: { "ExampleType" } </span> 
          <div className="Rating"> { "Example" }/5 </div>
          <div> Tags: { "ExampleTags" } Comments: { "ExampleComments" } </div>
        </span> 
      </container>
    );
  }

}
 
export default Class;