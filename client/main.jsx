import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Tour from './containers/tour.jsx';

import './styles/style.scss';

const root = document.createElement('root');
document.body.appendChild(root);

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Tour} />
  </Router>
  ,
  root
);
