import React, { Component } from 'react';
import ClassFilter from '../class/ClassFilter';
import ClassMasterList from '../class/ClassMasterList';

export default class AddClassDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ''
    };
  }

  render() {
    return (
      <div>
        <ClassFilter /> <br />
        <br />
        <ClassMasterList />
      </div>
    );
  }
}
