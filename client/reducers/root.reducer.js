import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import vouchers from './vouchers.reducer.js';

export default combineReducers({
  vouchers,
  routing: routerReducer,
});
