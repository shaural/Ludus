import React, { Component } from 'react';
import GenderDropDown from './GenderDropDown';

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAge: '',
      inputThing: ''
    };
  }

  handleSubmit() {
    var data = JSON.stringify({
      Age: this.state.inputAge,
      Thing: this.state.inputThing
    });
    /*Axios.patch(`https://us-central1-ludusfire.cloudfunctions.net/users/${
      this.props.userID
    }` */
  }

  render() {
    return (
      <div>
        <container>
          <div>
            <h3> Edit User Info </h3>
            <div>
              <form action="">
                <input
                  type="text"
                  placeholder="Age"
                  value={this.state.inputAge}
                />
                <br />
                <GenderDropDown />
                <br />
                <input
                  type="text"
                  placeholder="Thing"
                  value={this.state.inputThing}
                />
                <br />
                <button onClick={this.handleSubmit()}> Submit </button>
              </form>
            </div>
          </div>
        </container>
      </div>
    );
  }
}

export default UserEdit;
