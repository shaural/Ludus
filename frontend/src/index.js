import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Classlist from './components/Classlist.jsx';
import Nav from './components/Nav.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div><Nav /> <App /> <Classlist /></div>, document.getElementById('root'));

registerServiceWorker();
