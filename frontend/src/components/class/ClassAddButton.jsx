import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import './Buttons.css';

class ClassAddButton extends Component {
  //Nov 18
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      referrer: null
    };
  }

  handleClick = () => {
    this.setState({ referrer: '/classCreate' });
  };
  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;
    return (
      /*Placeholder*/
      <button onClick={this.handleClick}>Create a Class</button>
    );
  }
}

export default ClassAddButton;
