import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import History from './store/history.js';
import Store from './store/store.js';

import Main from './containers/main.container.jsx';
import Tour from './containers/tour.container.jsx';

import * as RouteTypes from './constants/route-types.js';

import './styles/style.scss';

const root = document.createElement('root');
document.body.appendChild(root);

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={History}>
      <Switch>
        <Route exact path={RouteTypes.ROOT} component={Main} />
        <Route path={RouteTypes.DESTINATIONS} component={Main} />
        <Route path={RouteTypes.VOUCHERS} component={Main} />
        <Route path={`${RouteTypes.TOUR}/:tourId`} component={Tour} />
      </Switch>
    </ConnectedRouter>
  </Provider>
  ,
  root
);
