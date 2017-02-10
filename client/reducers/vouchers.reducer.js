import * as actionTypes from '../constants/action-types.js';
import u from 'updeep';

import pullAt from 'lodash/head';
import drop from 'lodash/drop';
import map from 'lodash/map';
import pick from 'lodash/pick';
import assign from 'lodash/assign';

const initialState = {
  isReady: false,
};

const createHead = (firstRow) => {
  const supportedColumns = [
    'name',
    'company',
    'departure',
    'arrival',
    'price',
    'coin',
    'discount',
    'status',
    'guide',
    'notes',
  ];

  const supportedFirstRow = pick(firstRow, supportedColumns);

  const head = map(supportedFirstRow, (val, key) => {
    let base = {
      colName: key,
      displayName: val,
    };

    switch (key) {
      case 'name': {
        base = assign({}, base, {
          isFixed: true,
        });
        break;
      }
      default:
        break;
    }

    return base;
  });

  return head;
};


export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.RECIEVE_VOUCHERS: {
      const { vouchersRaw } = action;
      const firstRow = pullAt(vouchersRaw, [1]);
      const body = drop(vouchersRaw, [1]);
      const head = createHead(firstRow);

      return u({
        isReady: true,
        head,
        body,
      }, state);
    }

    default:
      return state;
  }
}
