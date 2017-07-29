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
    const company = get(activeVoucher, ['company']);

    return {
      companyName: company,
      extraInfo: getExtraInfo(company),
    };
  }
);

const getExtraInfo = (company, days) => {
  const first = {
    'Каспи Метрополь': 'Туристу одиночке, записавшемуся за 45 дней до выезда на туры до 8 дней в случае не нахождения компаньона, будет предоставлен одноместный номер без доплаты.',
    'Каспи Метрополь-long': '',
    'Аркия': 'При записи на тур за 3 месяца- дополнительная скидка 25$ Скидки не дублируются',
    'Офир': 'Туристу одиночке, в случае не нахождения компаньона(при подтверждении фирмы) будет предоставлен одноместный номер без доплаты.(туры до 7 дней',
    'Натур': 'Туристу одиночке, записавшемуся за 45 дней до выезда на туры (за исключением США, Канада и круизы) в случае не нахождения компаньона, будет предоставлен одноместный номер без доплаты.',
    'Эшет': 'Туристу одиночке, в случае не нахождения компаньона(при подтверждении фирмы) будет предоставлен одноместный номер без доплаты.(туры до 7 дней)',
  };

  const second = {
    'Каспи Метрополь': 'Дополнительная скидка постоянному клиенту Каспи-Метрополь за последние 3 года  при подтверждении туроператора о Вашем участии.',
    'Каспи Метрополь-long': 'Дополнительная скидка постоянному клиенту Каспи-Метрополь за последние 3 года  при подтверждении туроператора о Вашем участии.',
    'Аркия': '',
    'Офир': '',
    'Натур': 'Дополнительная скидка постоянному клиенту Натур за последние 5 лет  при подтверждении туроператора о Вашем участии',
    'Эшет': '',
  };

  const query =
    (company === 'Каспи Метрополь' && Number(days) >= 8)
      ? `${company}'-long'`
      : company;

  return {
    first: first[query],
    second: second[query],
  };
};
