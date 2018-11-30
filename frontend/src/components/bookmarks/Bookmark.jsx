import React, { Component } from 'react';
import Class from '../class/Class.jsx';
import Lp from '../learningpath/Lp.jsx';
import BookmarkRemoveButton from 'BookmarkRemoveButton.jsx';

class Bookmark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: ''
    };
  }
  componentDidMount = () => {
    if (this.props.type === 'class') {
      obj = <Class />;
      this.setState({ entry: obj });
    } else if (this.props.type === 'lp') {
      obj = <Lp />;
    }
  };

  render() {
    return (
      <div>
        {this.states.hi}
        <BookmarkRemoveButton
          userID={this.props.userID}
          bookmarkRef={this.props.userID}
          type={this.state.type}
        />
      </div>
    );
  }
}

export default Bookmark;
