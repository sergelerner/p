import * as actionTypes from '../constants/action-types.js';

export const filterBy = (filterName, value) => ({
  type: actionTypes.TOGGLE_FILTER,
  filterName,
  value,
});
