import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Classlist from './components/class/Classlist';
import ClasslistHeader from './components/class/ClasslistHeader';
import Nav from './components/Nav';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div>
		<Nav /> <App /> <ClasslistHeader /> <Classlist />
	</div>,
	document.getElementById('root')
);

registerServiceWorker();
