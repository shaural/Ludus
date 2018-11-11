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
  handleSubmit(){
    var data = JSON.stringify({
      Age: this.state.inputAge,
      Thing: this.state.inputThing
    });
    Axios.patch(`https://us-central1-ludusfire.cloudfunctions.net/users/${
      this.props.userID
    }`,
  }
  render() {
    return (
      <div>
        <container>
          <div class="modal-lg">
            <div class="modal-in">
              <form action="">
                <input type="text" Placeholder="Age" value={this.state.inputAge}/>
                <GenderDropDown />
                <input type="text" Placeholder="Thing" value={this.state.inputThing}/>
                <br></br>
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
