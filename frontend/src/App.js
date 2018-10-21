import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import custom component
import { Login } from './login';
import ClasslistHeader from './components/class/ClasslistHeader';
import Classlist from './components/class/Classlist';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<h1 className="App-title">Welcome to Ludus</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
        {/*Please enter your username and password to begin*/}
        {/*</p>*/}

        {/* This is how you render a custom component */}
        {/*<Login />*/}
        {/*<ClasslistHeader />*/}
        {/*<Classlist />*/}
        <Header />
        <Main />
      </div>
    );
  }
}
export default App;
