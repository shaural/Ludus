import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

// import Classlist from './components/class/Classlist';
// import ClasslistHeader from './components/class/ClasslistHeader';
// import NavBar from './components/NavBar';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <div>
    <BrowserRouter>
      {/*<NavBar />*/}
      <App />
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);

registerServiceWorker();
