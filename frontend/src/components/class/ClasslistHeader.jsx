import React, { Component } from 'react';
import ClassAddButton from './ClassAddButton';
import ClassFilter from './ClassFilter';
import './Classlist.css';


class ClasslistHeader extends Component {
  render() {
    return (
      <div className="Subject">
        My Classes: <ClassFilter /> <ClassAddButton />
      </div>
    );
  }

}

export default ClasslistHeader;
