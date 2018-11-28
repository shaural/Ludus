import React, { Component } from 'react';
import Bookmark from '../learningpath/Lp';
//import LpDropButton from './LpDropButton';
//import './Forms.css';
//import './ClassList.css';
const Axios = require('axios');

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      IDList: [],
      ObjList: []
    };
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount = () => {
    this.fetchBookmarks();
  };

  fetchBookmarks = () => {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/users/${
        this.props.userID
      }/student/bookmarks`
    )
      .then(function(response) {
        //populate the IDList
      })
      .then(function() {
        //convert the IDList into ObjectList
      });
    return <div>a</div>;
  };

  displayBookmarks = () => {
    let displayList = [];
    for (let id in this.state.ObjList) {
    }
    return;
  };

  render() {
    return (
      <div>
        <br /> <br />
        <div className="ClassForm">{this.displayBookmarks()}</div>
      </div>
    );
  }
}

export default ClassList;
