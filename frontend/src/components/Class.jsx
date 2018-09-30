import React, { Component } from 'react';
//import './Class.css';

class Class extends Component {
  render() { 
    return (
      <container>
        {this.fetchData(this.props.classID)}
        <span className="highlight">
          <button>Edit</button>
          <text>{" "}</text>
          <button>Remove</button>
        </span>
      </container>
    );
  }

    fetchData(ClassID) {
        //TODO: API Call for info on the class from database
        return (
            <container>
                <span>
                  {/* name */}ClassName {/* lp */} LearningPath {/* ct */"\n"} ContentType {this.props.classID}
                </span> 
                <span>{/* rating */} Rating</span>
            </container>
        );
    }

}
 
export default Class;