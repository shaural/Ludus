import React, { Component } from 'react';
import './Dashboard.css';
const Axios = require('axios');

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [] };
  }
  render() {
    return <div className="PanelInfo">{this.state.values}</div>;
  }

  componentDidMount = () => {
    let vars = [];
    for (let key in this.props.notInfo) {
      if (key === 'subject') {
        const name = (
          <div className="notName" key={key}>
            <b>{this.props.notInfo[key]}</b> <br />
          </div>
        );
        vars = [name, ...vars];
      } else if (key === 'sender_name') {
        vars.push(
          <span className="detail" key={key}>
            {'from: ' + this.props.notInfo[key]} &nbsp;
          </span>
        );
      } else {
        vars.push(
          <span className="detail" key={key}>
            {this.props.notInfo[key]} &nbsp;
          </span>
        );
      }
    }
    this.setState({ values: vars });
  };
}

export default Notification;
