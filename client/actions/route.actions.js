import * as actionTypes from '../constants/action-types.js';
import { loadSheet } from './drive.actions.js';

export const landOnHomePage = () => (dispatch) => {
  dispatch(loadSheet());
};
