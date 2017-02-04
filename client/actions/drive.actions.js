import Tabletop from 'tabletop';
import * as types from '../constants/action-types.js';

export const loadSheet = () => (dispatch) => {

  Tabletop.init({
    key: process.env.SETTINGS.sheetKey,
    callback: (result, tabletop) => {
      console.log('table result', result);

      dispatch({
        type: types.RECIEVE_VOUCHERS,
        result,
      });
    },
  });
};
