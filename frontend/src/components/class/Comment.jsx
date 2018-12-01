import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Class.css';

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [] };
  }

  render() {
    let author, comment, id;
    let i = 0;
    console.log(commentData);
    for (let index in this.props.commentData) {
      if (i == 0) {
        author = this.props.commentData[index];
      } else if (i == 1) {
        comment = this.props.commentData[index];
      } else if (i == 2) {
        id = this.props.commentData[index];
      }
      i++;
    }
    return <div className="ClassInfo">{author + ': ' + comment}</div>;
  }
}

export default Class;
