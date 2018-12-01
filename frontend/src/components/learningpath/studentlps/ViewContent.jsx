import React, { Component } from 'react';
import Youtube from 'react-youtube';

const Axios = require('axios');

class ViewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vid: 0,
      newcontent: '',
      content: ''
    };
  }

  callComplete() {
    Axios.patch(
      `https://us-central1-ludusfire.cloudfunctions.net/users/
      ${this.props.userID}/student/learning_path/
      ${this.props.UserID}/${this.props.ContentID}`
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    return false;
  }

  componentDidMount() {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/${
        this.props.ContentID
      }/info`
    ).then(({ data }) => {
      console.log(data);
      if (data.Content) {
        this.setState({
          content: JSON.stringify(data.Content)
        });
        var str = this.state.content;
        //console.log(str.substring(33,str.length-1));
        if (str.substring(1, 25) === 'https://www.youtube.com/') {
          this.setState({
            vid: 1,
            newcontent: str.substring(33, str.length - 1)
          });
        } else {
          newcontent: str;
        }
      }
    });
  }

  _onReady(event) {
    event.target.pauseVideo();
  }

  render() {
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };

    if (this.state.vid === 1) {
      return (
        <main>
          <div>
            <Youtube
              videoId={this.state.newcontent}
              opts={opts}
              onReady={this._onReady}
            />
          </div>
          <div>
            <button> Mark Complete </button>
          </div>
        </main>
      );
    } else {
      return (
        <main>
          <div>
            <p> {this.state.content} </p>
          </div>
          <div>
            <button> Mark Complete </button>
          </div>
        </main>
      );
    }
  }
}

export default ViewContent;
