import * as actionTypes from '../constants/action-types.js';
import moment from 'moment';
import u from 'updeep';

import pullAt from 'lodash/head';
import drop from 'lodash/drop';
import map from 'lodash/map';
import pick from 'lodash/pick';
import filter from 'lodash/filter';
import assign from 'lodash/assign';
import omit from 'lodash/omit';
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
      width: 300,
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

const createBody = (rows) => {
  const rangeDate = (departure, arrival) => {
    const d = moment(departure, 'DD/MM/YYYY').format('DD-MM');
    const a = moment(arrival, 'DD/MM/YYYY').format('DD-MM');
    return `${d} / ${a}`;
  };

  const body = rows.map((row) => ({
    ...row,
    departure: rangeDate(row.departure, row.arrival),
    price: `${row.price}${row.coin}|${row.price - row.discount}${row.coin}`,
    company: `${row.company} | ${row.guide}`,
  }));

  return body;
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.RECIEVE_VOUCHERS: {
      const { vouchersRaw } = action;
      const firstRow = pullAt(vouchersRaw, [1]);
      const otherRows = drop(vouchersRaw, [1]);
      const body = createBody(otherRows);
      const head = createHead(firstRow);

      return u({
        isReady: true,
        head,
        all: body,
        body,
      }, state);
    }

    case actionTypes.TOGGLE_FILTER: {
      const { filterName, value, isActive } = action;
      const { filters, all } = state;

      const updatedFilters =
        (isActive)
          ? assign({}, filters, { [filterName]: value })
          : omit(filters, [filterName]);

      return u({
        filters: () => updatedFilters,
        body: filter(all, updatedFilters),
      }, state);
    }

    default:
      return state;
  }
}
