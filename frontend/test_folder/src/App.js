import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react-bootstrap'
class App extends Component {
  constructor(props, context){
    super(props, context);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }


  getValidationState(){
    const isEmpty = this.state.value.length
    if(isEmpty == 0){
      return 'bad data'
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form>
          <FormGroup
            name="Enter name"
            validationState={this.getValidationState()}
          >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
      </div>
      
    );
  }
}
render(<FormExample/>)
export default App;
