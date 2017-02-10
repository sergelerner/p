import * as actionTypes from '../constants/action-types.js';
import u from 'updeep';

import map from 'lodash/map';
import get from 'lodash/get';
import pullAt from 'lodash/head';
import drop from 'lodash/drop';
import reduce from 'lodash/reduce';
import compact from 'lodash/compact';
import keyBy from 'lodash/keyBy';

const initialState = {
  isReady: false,
  company: {},
};

const supportedFilters = [
  'company',
  'country',
  'city',
  'category1',
  'category2',
  'category3',
  'guide',
  'month',
  'status',
];

const createFilter = (filterName, filterTypes, filterLists) => {
  const settings = {
    company: {
      component: 'list',
    },
    country: {
      component: 'dropdown',
    },
    city: {
      component: 'dropdown',
    },
    category1: {
      component: 'list',
    },
    category2: {
      component: 'list',
    },
    category3: {
      component: 'list',
    },
    guide: {
      component: 'dropdown',
    },
    month: {
      component: 'list',
    },
    status: {
      component: 'list',
    },
  };

  const list = reduce(filterLists, (acc, item) => {
    acc.push(get(item, [filterName]));
    return acc;
  }, []);

  return {
    filterName,
    displayName: filterTypes[filterName],
    ...settings[filterName],
    list: compact(list),
  };
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.RECIEVE_FILTERS: {
      const { filtersRaw } = action;
      const firstRow = pullAt(filtersRaw, [1]);
      const otherRows = drop(filtersRaw, [1]);

      const filters = map(supportedFilters, (filterName) =>
        createFilter(filterName, firstRow, otherRows));

      const filtersMap = keyBy(filters, 'filterName');

      return u({
        isReady: true,
        ...filtersMap,
      }, state);
    }

    default:
      return state;
  }
}
