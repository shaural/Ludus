import React, { Component } from 'react';
import Comment from './Class';
import './Forms.css';
var querystring = require('querystring');
const Axios = require('axios');

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: this.props.userID /*-LNVWR9kD2dvN8GLGFYE*/,
      update: '',
      commentList: [],
      commentAuths: [],
      commentIDs: [],
      commentMessage: ''
    };
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount = () => {
    this.createCommentList();
  };

  createCommentList = () => {
    if (!this.props.userID) return;
    let query = '?';
    query += 'owner=' + this.state.owner;
    if (this.state.name.toString().length) {
      query += '&name=' + this.state.name;
    }
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/${
        this.props.classID
      }/comments`
    )
      .then(response => {
        console.log(response);
        let commentList = [];
        let commentAuths = [];
        let commentIDs = [];
        for (let id in response.data) {
          let i = 0;
          for (let sid in response.data[id]) {
            if (i == 0) {
              commentIDs.push(response.data[id][sid]);
            } else if (i == 1) {
              commentAuths.push(response.data[id][sid]);
            } else if (i == 2) {
              commentList.push(response.data[id][sid]);
            }
            i++;
          }
        }
        this.setState({
          commentList: commentList,
          commentAuths: commentAuths,
          commentIDs: commentIDs
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(this.submitSearch);
    return;
  };

  handlePost = () => {
    const requestBody = {
      author: this.props.userID,
      comment: this.state.commentMessage
    };
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    Axios.post(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/${
        this.props.classID
      }/comment`,
      querystring.stringify(requestBody),
      config
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error.message);
      });
    return;
  };

  handleDelete = () => {
    const requestBody = {
      author: this.props.userID,
      comment: this.state.commentMessage
    };
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    Axios.post(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/${
        this.props.classID
      }/comment/`,
      querystring.stringify(requestBody),
      config
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error.message);
      });
    return;
  };

  submitSearch = () => {
    if (this.state.commentList === undefined || !this.state.commentList)
      return <h2>No comments...</h2>;
    let comments = [];
    for (let id in this.state.commentList) {
      comments.push(
        <div className="ClassObject" key={id}>
          {
            <div className="ClassInfo">
              <b>{this.state.commentAuths[id] + ': '}</b>
              {this.state.commentList[id]}
            </div>
          }
          {<Comment commentData={this.state.commentList[id]} />}
        </div>
      );
    }
    return comments;
  };

  render() {
    return (
      <div>
        <br /> <br />
        <div className="ClassForm">
          {this.submitSearch()}
          <br />
          <textarea
            className="commentBox"
            onChange={event =>
              this.setState({ commentMessage: event.target.value })
            }
          />
          <br />
          <button onClick={this.handlePost}>Post</button>
        </div>
      </div>
    );
  }
}
