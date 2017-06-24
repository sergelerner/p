import { push } from 'react-router-redux';
import { filterBy } from './filter.actions.js';

import * as RouteTypes from '../constants/route-types.js';

import get from 'lodash/get';

export const enterVouchers = (subdestination) => (dispatch, getState) => {
  const { filters } = getState();
  const activeDestination = get(filters, ['active', 'destination']);

  dispatch(filterBy('subdestination', subdestination, true));
  dispatch(push(`${RouteTypes.VOUCHERS}/${activeDestination}/${subdestination}`));
};

export const enterTour = (id) => (dispatch) => {
  dispatch(push(`${RouteTypes.TOUR}/${id}`));
};
