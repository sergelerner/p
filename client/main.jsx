import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';

import Store from './store/store.js';
import { landOnHomePage, landOnTour } from './actions/route.actions.js';

import Main from './containers/main.container.jsx';
import Tour from './containers/tour.container.jsx';

import './styles/style.scss';

const history = syncHistoryWithStore(browserHistory, Store);

const root = document.createElement('root');
document.body.appendChild(root);

const handleLandOnHome = ({ dispatch }) => (nextState) => {
  const { location } = nextState;
  dispatch(landOnHomePage(location));
};

const handleLandOnTour = ({ dispatch }) => (nextState) => {
  const { location } = nextState;
  dispatch(landOnTour(location));
};

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <Route path="/p" component={Main} onEnter={handleLandOnHome(Store)}/>
      <Route path="/tour" component={Tour} onEnter={handleLandOnTour(Store)}/>
    </Router>
  </Provider>
  ,
  root
);
