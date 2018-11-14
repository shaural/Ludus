import React, { Component } from 'react';
import Lp from './Lp';
//import LpDropButton from './LpDropButton';
//import './Forms.css';
//import './ClassList.css';
const Axios = require('axios');

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: this.props.userID /*-LNVWR9kD2dvN8GLGFYE*/,
      update: '',
      pathIDList: [],
      pathInfo: []
    };
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount = () => {
    this.createPathList();
  };

  createPathList = () => {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/users/${
        this.props.userID
      }/student/learningPaths`
    )
      .then(response => {
        console.log(response);
        let IDList = [];
        let InfoList = [];
        for (let id in response.data) {
          if (id != 'message') {
            for (let sid in response.data[id]) {
              for (let did in response.data[id][sid]) {
                console.log(did);
                IDList.push(did);
              }
            }
          }
        }
        this.setState({ pathIDList: IDList, pathInfo: InfoList });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(this.submitSearch);
    return;
  };

  submitSearch = () => {
    if (this.state.pathIDList === undefined || !this.state.pathIDList)
      return <h2>No Learning Paths...</h2>;
    let paths = [];
    for (let id in this.state.pathIDList) {
      paths.push(
        <div className="LpObject" key={id}>
          {<Lp LearningPathID={this.state.pathIDList[id]} />}
          {/*<LpDropButton onClick={(event) => this.setState({ update: '' })} classID={this.state.classIDList[id]} />*/}
        </div>
      );
    }
    return paths;
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
        </form>
        <br /> <br />
        <div className="ClassForm">{this.submitSearch()}</div>
      </div>
    );
  }
}

export default ClassList;
