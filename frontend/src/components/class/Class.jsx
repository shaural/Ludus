import React, { Component } from 'react';
import './Class.css';

class Class extends Component {
  render() { 
    return (
      <div>
        {this.fetchData(this.props.classID)}
      </div>
    );
  }

    fetchData(ClassID) {
        //TODO: API Call for info on the class from database
        return (
            <container>
                <span className="ClassInfo">
                  <span>{/* name */ "Example Class 101"}  LP: {/* lp */ "ExamplePath"}  Content Type: {/* ct */ "ExampleType"}  </span> 
                  <div className="Rating"> {/* rating */"Example"}/5 </div>
                  <div> Tags: {/* rating */"ExampleTags"} Comments: {/* Comments */ "ExampleComments"} </div>
                </span> 
                
            </container>
        );
    }

}
 
export default Class;