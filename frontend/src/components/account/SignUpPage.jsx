import React, { Component } from 'react';
import SignUp from './SignUp';
import NavBar from '../NavBar';

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <NavBar /> <SignUp />
      </div>
    );
  }
}
export default SignUpPage;
