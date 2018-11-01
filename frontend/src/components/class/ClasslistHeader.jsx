import React, { Component } from 'react';
import ClassAddButton from './ClassAddButton';
import ClassFilter from './ClassFilter';
import './Classlist.css';

class ClasslistHeader extends Component {
  render() {
    return (
      <div className="Subject">
        <h1>My Classes</h1> <br />
        <ClassFilter /> <ClassAddButton />
      </div>
    );
  }
}

export default ClasslistHeader;
