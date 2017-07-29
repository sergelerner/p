import * as actionTypes from '../constants/action-types.js';
import u from 'updeep';

import pullAt from 'lodash/head';
import drop from 'lodash/drop';
import map from 'lodash/map';
import pick from 'lodash/pick';
import sortBy from 'lodash/sortBy';

const initialState = {
  isReady: false,
};

const createHead = (firstRow) => {
  const supportedColumns = [
    'departure',
    'name',
    'company',
    'status',
    'price',
    'notes',
  ];

  const settings = {
    departure: {
      width: 120,
    },
    name: {
      width: 300,
    },
    company: {
      width: 150,
    },
    status: {
      width: 150,
    },
    price: {
      width: 100,
    },
    notes: {
      width: 200,
    },
  };

  const supportedFirstRow = pick(firstRow, supportedColumns);

  const head = map(supportedFirstRow, (val, key) => ({
    colName: key,
    displayName: val,
    ...settings[key],
  }));

  const sorrtedHead = sortBy(head, (item) =>
    supportedColumns.indexOf(item.colName));

  return sorrtedHead;
};

const createAll = (otherRows) => map(otherRows, (row) => ({
  ...row,
  description: undefined,
  voucherId: row.description.split('=')[1],
}));

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.RECIEVE_VOUCHERS: {
      const { vouchersRaw } = action;
      const firstRow = pullAt(vouchersRaw, [1]);
      const otherRows = drop(vouchersRaw, [1]);

      const head = createHead(firstRow);
      const all = createAll(otherRows);

      return u({
        isReady: true,
        all,
        head,
      }, state);
    }

    default:
      return state;
  }
}
