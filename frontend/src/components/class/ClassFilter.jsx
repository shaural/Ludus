import React, { Component } from 'react';
import './Forms.css';

class ClassFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { key: '' };
  }

  render() {
    return (
      /*TODO: Implementation*/
      <form className="FilterBar">
        <input
          onChange={event => this.setState({ key: event.target.value })}
          value="Filter classes"
        />
      </form>
    );
  }
}

export default ClassFilter;
