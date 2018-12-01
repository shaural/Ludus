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
      commentInfo: [],
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
      `https://us-central1-ludusfire.cloudfunctions.net/classes/search/${query}`
    )
      .then(response => {
        console.log(response);
        let commentIDList = [];
        let commentInfoList = [];
        for (let id in response.data) {
          commentIDList.push(response.data[id][0]);
          commentInfoList.push(response.data[id][1]);
        }
        this.setState({
          commentIDList: commentIDList,
          commentInfo: commentInfoList
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

  submitSearch = () => {
    if (this.state.commentIDList === undefined || !this.state.commentIDList)
      return <h2>No comments...</h2>;
    let comments = [];
    for (let id in this.state.commentIDList) {
      comments.push(
        <div className="ClassObject" key={id}>
          {
            <Comment
              commentID={this.state.commentIDList[id]}
              commentInfo={this.state.commentInfo[id]}
            />
          }
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
