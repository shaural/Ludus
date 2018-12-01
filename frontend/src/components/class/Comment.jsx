import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Class.css';

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [] };
  }
  render() {
    return (
      <div className="ClassInfo">
        {this.props.commentInfo[0] + ': ' + this.props.commentInfo[1]}
      </div>
    );
  }

  componentDidMount = () => {
    let vars = [];

    this.setState({ values: vars });
  };
}

export default Class;
