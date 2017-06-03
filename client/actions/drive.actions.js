import Tabletop from '../assets/vendor/tabletop.1.5.1.js';
import * as actionTypes from '../constants/action-types.js';

import get from 'lodash/get';

export const loadSheet = () => (dispatch) => {

  const key = process.env.SETTINGS.sheetKey;

  Tabletop.init({
    key,
    callback: (result, _tabletop) => {
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

export const loadDoc = (id) => (dispatch) => {
  const docPath = `https://docs.google.com/feeds/download/documents/export/Export?id=${id}&exportFormat=html`;

  dispatch({
    type: actionTypes.LOAD_TOUR,
  });

  fetch(docPath)
    .then((response) => response.text())
    .then((result) => {
      dispatch({
        type: actionTypes.VIEW_TOUR,
        id,
        result,
      });
    });
};
