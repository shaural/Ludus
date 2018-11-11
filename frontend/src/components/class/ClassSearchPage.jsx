import React, { Component } from 'react';
import ClassSearch from './ClassSearch';
import NavBar from '../NavBar';

class ClassSearchPage extends Component {
  render() {
    return (
      <div>
        <NavBar /> <ClassSearch />
      </div>
    );
  }
}
export default ClassSearchPage;
