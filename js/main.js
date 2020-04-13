import React    from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from '~/App/App.jsx';

import store from '~/store.js';

import '~/fontawesome.js';


ReactDOM.render
(
	<Provider store={store}>
		<App store={store} />
	</Provider>,
	document.getElementById ('main-app')
);
