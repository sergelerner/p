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
import assign from 'lodash/assign';

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
  'months',
  'status',
];

const createFilter = (filterName, filterTypes, filterLists) => {
  const settings = {
    company: {
      component: DROPDOWN_COMP,
      placeholder: 'Выберите туроператора',
    },
    country: {
      component: DROPDOWN_COMP,
      placeholder: 'Выберите страну',
    },
    city: {
      component: DROPDOWN_COMP,
      placeholder: 'Выбрать город',
    },
    category1: {
      component: DROPDOWN_COMP,
      placeholder: 'Выберите направление',
    },
    category2: {
      component: DROPDOWN_COMP,
    },
    category3: {
      component: DROPDOWN_COMP,
    },
    guide: {
      component: DROPDOWN_COMP,
      placeholder: 'Выбрать гида',
    },
    months: {
      component: DROPDOWN_COMP,
      placeholder: 'Выберите месяц',
    },
    status: {
      component: LIST_COMP,
    },
  };

  const list = reduce(filterLists, (acc, item) => {
    if (item[filterName]) {
      acc.push({
        name: get(item, [filterName]),
        isActive: false,
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

    case actionTypes.TOGGLE_FILTER: {
      const { filterName, value, isActive } = action;

      const list = map(get(state, [filterName, 'list']), (filter) =>
        (filter.name === value)
          ? assign({}, filter, { isActive })
          : assign({}, filter, { isActive: false })
        );

      return u({
        [filterName]: (props) => ({
          ...props,
          list,
        }),
      }, state);
    }

    default:
      return state;
  }
}
