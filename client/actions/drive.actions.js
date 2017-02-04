import Tabletop from 'tabletop';
import * as types from '../constants/action-types.js';

import get from 'lodash/get';

export const loadSheet = () => (dispatch) => {

  Tabletop.init({
    key: process.env.SETTINGS.sheetKey,
    callback: (result, tabletop) => {
      console.log('table result', result);

      dispatch({
        type: types.RECIEVE_VOUCHERS,
        vouchersRaw: get(result, ['vouchers', 'elements']),
      });
    },
  });
};
