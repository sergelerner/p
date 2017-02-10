import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';

import Store from './store/store.js';
import { landOnHomePage } from './actions/route.actions.js';

import Tour from './containers/tour.jsx';
import App from './containers/app.jsx';

import './styles/style.scss';

const history = syncHistoryWithStore(browserHistory, Store);

const root = document.createElement('root');
document.body.appendChild(root);

const handleLandOnHome = ({ dispatch }) => (nextState) => {
  const { location } = nextState;
  dispatch(landOnHomePage(location));
};

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <Route path="*" component={App} onEnter={handleLandOnHome(Store)}/>
    </Router>
  </Provider>
  ,
  root
);
