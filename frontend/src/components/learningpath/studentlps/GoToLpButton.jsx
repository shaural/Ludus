import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import './Buttons.css';

class GoToLpButton extends Component {
  //Nov 18
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      referrer: null
    };
  }

  handleClick = () => {
    this.setState({ referrer: `/student-lpview?${this.props.LearningPathID}` });
  };
  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;
    return (
      /*Placeholder*/
      <button onClick={this.handleClick}>View LearningPath</button>
    );
  }
}

export default GoToLpButton;
