import { createSelector } from 'reselect';
import moment from 'moment';

import get from 'lodash/get';
import filter from 'lodash/filter';
import find from 'lodash/find';

const selectAllVouchers = (state) => get(state, ['vouchers', 'all']);
const selectActiveFilters = (state) => get(state, ['filters', 'active']);
const selectActiveVoucherId = (state) => get(state, ['vouchers', 'activeVoucherId']);

export const selectFilteredVouchers = createSelector(
  [selectAllVouchers, selectActiveFilters],
  (allVouchers, activeFilters) => {
    const filteredVouchers = filter(allVouchers, activeFilters);

    const rangeDate = (departure, arrival) => {
      const d = moment(departure, 'DD/MM/YYYY').format('DD.MM');
      const a = moment(arrival, 'DD/MM/YYYY').format('DD.MM');
      return `${d} - ${a}`;
    };

    const body = filteredVouchers.map((row) => ({
      ...row,
      departure: rangeDate(row.departure, row.arrival),
      price: row.price + row.coin + '|' + (row.price - row.discount) + row.coin,
      company: row.company + ' | ' + row.guide,
    }));

    return body;
  }
);

export const selectActiveVoucher = createSelector(
  [selectAllVouchers, selectActiveVoucherId],
  (allVouchers, activeVoucherId) => {
    const activeVoucher = find(allVouchers, { voucherId: activeVoucherId });

    return activeVoucher;
  }
);
