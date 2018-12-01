import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import './Class.css';
const Axios = require('axios');

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = { display: [] };
  }
  componentDidMount = () => {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/${
        this.props.match.params.classID
      }/info`
    )
      .then(response => {
        let classInfo = response.data;
        console.log(classInfo);
        this.drawMenu(classInfo);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  drawMenu = classInfo => {
    let vars = [];
    let menu = '';
    let owner = '';

    //Class Info Display
    for (let key in classInfo) {
      if (key === 'Name') {
        const newTo = {
          pathname: `/class-menu/${this.props.match.params.classID}`,
          state: 'rip'
        };
        const name = (
          <div className="className" key={key}>
            <b>
              <Link to={newTo}>{classInfo[key]}</Link>
            </b>{' '}
            <br />
          </div>
        );
        vars = [name, ...vars];
      } else if (key === 'Owner') {
        owner = classInfo[key];
        vars.push(
          <div className="expandedDetail" key={key}>
            {key + ': ' + classInfo[key]} <br />
          </div>
        );
      } else if (key === 'Tags') {
        let stringo = classInfo[key].substring(1, classInfo[key].length - 1);
        vars.push(
          <div className="expandedDetail" key={key}>
            {key + ': ' + stringo} &nbsp;
          </div>
        );
      } else if (key === 'Content_type') {
        vars.push(
          <div className="expandedDetail" key={key}>
            {'Content Type: ' + classInfo[key]} <br />
          </div>
        );
      } else if (key === 'Time') {
        vars.push(
          <div className="expandedDetail" key={key}>
            {'Estimated time to complete: ' + classInfo[key] + 'min'} <br />
          </div>
        );
      } else if (key === 'Mature' && classInfo[key] === 'yes') {
        vars.push(
          <div className="mature" key={'Tags'}>
            &nbsp;
            {'Mature Content'}
            &nbsp;
          </div>
        );
      } else {
        vars.push(
          <div className="expandedDetail" key={key}>
            {key + ': ' + classInfo[key]} <br />
          </div>
        );
      }
    }

    //Action Menu Items
    vars.push(
      <div className="expandedDetail" key="View">
        <br />
        <Link to="/">View Class</Link>
      </div>
    );
    if (this.props.location.state === owner) {
      vars.push(
        <div className="expandedDetail" key="Edit">
          <Link to="/">Edit Class</Link>
        </div>
      );
    }
    vars.push(
      <div className="expandedDetail" key="Delete">
        <Link to="/">Edit Class</Link>
      </div>
    );
    if (owner.trim() !== this.props.location.state) {
      vars.push(
        <div className="expandedDetail" key="Delete">
          <Link to="/">Rate Class</Link>
        </div>
      );
    }
    vars.push(
      <CommentSection
        classID={this.props.match.params.classID}
        userID={this.props.location.state}
      />
    );
    menu = <div className="expandedClassInfo">{vars}</div>;
    this.setState({ display: menu });
    return;
  };

  render() {
    return <div>{this.state.display}</div>;
  }
}

export default Class;
