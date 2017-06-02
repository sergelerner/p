import History from '../store/history.js';

import * as actionTypes from '../constants/action-types.js';
import { loadSheet, loadDoc } from './drive.actions.js';

import get from 'lodash/get';

export const landOnHomePage = () => (dispatch) => {
  dispatch(loadSheet());
};

export const landOnTour = (location) => (dispatch) => {
  const id = get(location, ['query', 'id']);
  dispatch(loadDoc(id));
};

export const goToTour = (id) => (_dispatch) => {
  History.push(`tour/?id=${id}`);
};
