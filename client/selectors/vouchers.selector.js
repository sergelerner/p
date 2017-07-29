import { createSelector } from 'reselect';
import moment from 'moment';
import get from 'lodash/get';
import filter from 'lodash/filter';

const selectAllVouchers = (state) => get(state, ['vouchers', 'all']);
const selectActiveFilters = (state) => get(state, ['filters', 'active']);

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
      description: row.description.split('=')[1],
    }));

    return body;
  }
);
