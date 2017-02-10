import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import vouchers from './vouchers.reducer.js';
import filters from './filters.reducer.js';

export default combineReducers({
  vouchers,
  filters,
  routing: routerReducer,
});
