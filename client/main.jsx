import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import History from './store/history.js';
import Store from './store/store.js';
import { landOnHomePage, landOnTour } from './actions/route.actions.js';

import Main from './containers/main.container.jsx';
import Tour from './containers/tour.container.jsx';

import './styles/style.scss';

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

const ActionableRoute = ({ component: Component, action, ...rest}) => (
  <Route {...rest} render={({ location }) => {
    action(location);
    return <Component {...rest} />;
  }}/>
);

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={History}>
      <Switch>
        <ActionableRoute exact path="/" component={Main} action={handleLandOnHome(Store)}/>
        <Route path="/tour" component={Tour} onEnter={handleLandOnTour(Store)}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
  ,
  root
);
