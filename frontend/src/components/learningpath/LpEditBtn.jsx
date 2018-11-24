import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LpEditBtn extends Component {
  render() {
    return (
      /*TODO: API Call and Styling*/
      <button>
        <Link
          to={{
            pathname: '/LPEdit',
            state: {
              lpid: this.props.LearningPathID,
              name: 'John Doe',
              topic: 'Juggling',
              owner: 'Jack Smith'
            }
          }}
        >
          Edit learning_path
        </Link>
      </button>
    );
  }
}

export default LpEditBtn;
