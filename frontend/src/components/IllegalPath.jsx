import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//import 'IllegalPath.css';

export default class IllegalPath extends Component {
  render() {
    return (
      <div>
        <header>404</header>
        Oops! Here's a silly, meaningless, but endearing message about how
        something went wrong.
        <br />
        <Link to="/">Back into the fray</Link>
      </div>
    );
  }
}
