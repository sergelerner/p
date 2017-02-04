import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/root.reducer.js';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const middleware = [ReduxThunk];

let devtools;

if (window.devToolsExtension) {
  devtools = window.devToolsExtension();
}

if (!devtools) {
  devtools = (f) => f;
}

middleware.push(routerMiddleware(browserHistory));

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    devtools)
);

export default store;
