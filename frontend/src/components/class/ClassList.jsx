import React, { Component } from 'react';
import Class from './Class';
import ClassAddButton from './ClassAddButton';
import ClassRemoveButton from './ClassRemoveButton';
import './Forms.css';
import './ClassList.css';
const Axios = require('axios');

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: this.props.userID /*-LNVWR9kD2dvN8GLGFYE*/,
      update: '',
      classList: [],
      classInfo: []
    };
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount = () => {
    this.createClasslist();
  };

  createClasslist = () => {
    if (!this.props.userID) return;
    let query = '?';
    query += 'owner=' + this.state.owner;
    if (this.state.name.toString().length) {
      query += '&name=' + this.state.name;
    }
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/search/${query}`
    )
      .then(response => {
        console.log(response);
        let classIDList = [];
        let classInfoList = [];
        for (let id in response.data) {
          classIDList.push(response.data[id][0]);
          classInfoList.push(response.data[id][1]);
        }
        this.setState({ classIDList: classIDList, classInfo: classInfoList });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(this.submitSearch);
    return;
  };

  submitSearch = () => {
    if (this.state.classIDList === undefined || !this.state.classIDList)
      return <h2>No classes...</h2>;
    let classes = [];
    for (let id in this.state.classIDList) {
      classes.push(
        <div className="ClassObject" key={id}>
          {
            <Class
              classID={this.state.classIDList[id]}
              classInfo={this.state.classInfo[id]}
            />
          }
          {
            <ClassRemoveButton
              onClick={event => this.setState({ update: '' })}
              classID={this.state.classIDList[id]}
            />
          }
        </div>
      );
    }
    return classes;
  };

  render() {
    return (
      <div>
        <form className="FilterBar">
          <br />
          Filter by name:&nbsp;
          <input
            className="filterText"
            type="text"
            onChange={event => this.setState({ name: event.target.value })}
          />
          <input
            type="button"
            id="submitbutton"
            value="Go"
            onClick={this.createClasslist}
          />{' '}
          &nbsp;
          <ClassAddButton />
        </form>
        <br /> <br />
        <div className="ClassForm">{this.submitSearch()}</div>
      </div>
    );
  }
}

export default ClassList;
