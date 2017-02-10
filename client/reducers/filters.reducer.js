import * as actionTypes from '../constants/action-types.js';
import {
  LIST_COMP,
  DROPDOWN_COMP,
} from '../constants/filter-component-types.js';

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
      component: LIST_COMP,
    },
    country: {
      component: DROPDOWN_COMP,
    },
    city: {
      component: DROPDOWN_COMP,
    },
    category1: {
      component: LIST_COMP,
    },
    category2: {
      component: LIST_COMP,
    },
    category3: {
      component: LIST_COMP,
    },
    guide: {
      component: DROPDOWN_COMP,
    },
    month: {
      component: LIST_COMP,
    },
    status: {
      component: LIST_COMP,
    },
  };

  const list = reduce(filterLists, (acc, item) => {
    if (item[filterName]) {
      acc.push({
        name: get(item, [filterName]),
      });
    }
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

      return u({
        isReady: true,
        ...keyBy(filters, 'filterName'),
      }, state);
    }

    default:
      return state;
  }
}
