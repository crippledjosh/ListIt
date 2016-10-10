import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import rootRoutes from '../../router/routes.js';

Meteor.startup(() => {
	ReactDOM.render(<Router history={browserHistory} routes={rootRoutes} />, document.getElementById('app'))
});
