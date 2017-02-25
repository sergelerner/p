import parseHtml from '../utils/parse-html.js';
import * as actionTypes from '../constants/action-types.js';
import u from 'updeep';

const initialState = {
  id: '',
  isReady: false,
  content: '',
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.VIEW_TOUR: {
      const { id, result } = action;
      const { html, styles } = parseHtml(result);
      return u({
        id,
        isReady: true,
        content: html + styles,
      }, state);
    }

    case actionTypes.LOAD_TOUR: {
      return u({
        id: '',
        isReady: false,
        content: '',
      }, state);
    }

    default:
      return state;
  }
}
