import parseHtml from '../utils/parse-html.js';
import * as actionTypes from '../constants/action-types.js';
import u from 'updeep';

const initialState = {
  isReady: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.VIEW_TOUR: {
      const { id, result } = action;
      const { html, styles } = parseHtml(result);
      return u({
        id,
        content: html + styles,
      }, state);
    }

    default:
      return state;
  }
}
