import React, { Component } from 'react';
import Youtube from 'react-youtube';

const Axios = require('axios');

class ViewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newcontent: '',
      content: ''
    };
  }

  componentDidMount() {
    Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/classes/${this.props.ContentID}/info`)
    .then(({ data }) => {
       console.log(data);
       this.setState({
         content: data.Content
 			 });

 	  });
    var str = this.state.content.substring(32, this.state.content.length);
    this.setState({
      newcontent: str
    });
  }

  _onReady(event) {
    //event.target.pauseVideo();
  }

  render() {
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };

    return(
      <div>
        <Youtube
          videoId="dQw4w9WgXcQ"
          opts={opts}
          //onReady={this._onReady}
        />
      </div>
    );
  }

}


export default ViewContent;
