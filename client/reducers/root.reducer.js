import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import vouchers from './vouchers.reducer.js';
import filters from './filters.reducer.js';
import tours from './tours.reducer.js';

export default combineReducers({
  vouchers,
  filters,
  tours,
  routing: routerReducer,
});
