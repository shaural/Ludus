import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import Classlist from './components/class/Classlist';
import ClasslistHeader from './components/class/ClasslistHeader';
import SignUp from './components/account/SignUp';
import NavBar from './components/NavBar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <NavBar /> <App /> <SignUp /> <ClasslistHeader /> <Classlist />
  </div>,
  document.getElementById('root')
);

registerServiceWorker();
