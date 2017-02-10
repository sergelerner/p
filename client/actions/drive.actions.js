import Tabletop from 'tabletop';
import * as actionTypes from '../constants/action-types.js';

import get from 'lodash/get';

export const loadSheet = () => (dispatch) => {

  Tabletop.init({
    key: process.env.SETTINGS.sheetKey,
    callback: (result, tabletop) => {
      console.log('table result', result);

      dispatch({
        type: actionTypes.RECIEVE_VOUCHERS,
        vouchersRaw: get(result, ['vouchers', 'elements']),
      });

      dispatch({
        type: actionTypes.RECIEVE_FILTERS,
        filtersRaw: get(result, ['filters', 'elements']),
      });
    },
  });
};
