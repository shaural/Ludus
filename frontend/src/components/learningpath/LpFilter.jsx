import React, { Component } from 'react';

class LpFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: ''
    };
  }
  render() {
    return (
      /*TODO: Implementation*/
      <form className="FilterBar">
        <input
          className="inLine"
          type="text"
          onChange={event => this.setState({ topic: event.target.value })}
        />
      </form>
    );
  }
}

export default LpFilter;
