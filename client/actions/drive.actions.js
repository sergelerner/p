import Tabletop from '../assets/vendor/tabletop.1.5.1.js';

import * as ActionTypes from '../constants/action-types.js';
import * as TableTypes from '../constants/table-types.js';

import get from 'lodash/get';

export const loadSheet = () => (dispatch) => {

  const key = process.env.SETTINGS.sheetKey;

  Tabletop.init({
    key,
    callback: (result, _tabletop) => {
      console.log('table result', result);

      dispatch({
        type: ActionTypes.RECIEVE_DEALS,
        raw: get(result, [TableTypes.DEALS, 'elements']),
      });

      dispatch({
        type: ActionTypes.RECIEVE_VOUCHERS,
        vouchersRaw: get(result, [TableTypes.VOUCHERS, 'elements']),
      });

      dispatch({
        type: ActionTypes.RECIEVE_FILTERS,
        raw: get(result, [TableTypes.FILTERS, 'elements']),
      });
    },
  });
};

export const loadDoc = (id) => (dispatch) => {
  const docPath = `https://docs.google.com/feeds/download/documents/export/Export?id=${id}&exportFormat=html`;

  dispatch({
    type: ActionTypes.LOAD_TOUR,
  });

  fetch(docPath)
    .then((response) => response.text())
    .then((result) => {
      dispatch({
        type: ActionTypes.VIEW_TOUR,
        id,
        result,
      });
    });
};
