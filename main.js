import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const appMountPoint = document.getElementById('app');

ReactDOM.render(<App />, appMountPoint);
