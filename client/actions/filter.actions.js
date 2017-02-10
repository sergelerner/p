import * as actionTypes from '../constants/action-types.js';

export const filterBy = (filterName, value, isActive) => ({
  type: actionTypes.TOGGLE_FILTER,
  filterName,
  value,
  isActive,
});
