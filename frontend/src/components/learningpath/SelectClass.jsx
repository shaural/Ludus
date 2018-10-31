import React, { Component } from 'react';
import ClassFilter from '../class/ClassFilter';
import AddList from './AddList';

export default class SelectClass extends Component {
  render() {
    return (
      <div>
        <ClassFilter /> <br />
        <br />
        <AddList />
      </div>
    );
  }
}
