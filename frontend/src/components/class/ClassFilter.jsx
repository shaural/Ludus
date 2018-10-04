import React, { Component } from 'react';
import './Forms.css';

class ClassFilter extends Component {
  render() { 
    return (
    /*TODO: Implementation*/
        <form className="FilterBar">
          <input ref={input => this.search = input} value="Filter your classes"/>
        </form>
    );
  }
}
 
export default ClassFilter;