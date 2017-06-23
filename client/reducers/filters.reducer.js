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
import omit from 'lodash/omit';

const initialState = {
  isReady: false,
  all: {},
  active: {},
};

const supportedFilters = [
  'company',
  'guide',
  'months',
  'status',
  'active',
  'category',
];

const components = {
  company: {
    uiType: DROPDOWN_COMP,
    placeholder: 'Выберите туроператора',
  },
  guide: {
    uiType: DROPDOWN_COMP,
    placeholder: 'Выбрать гида',
  },
  months: {
    uiType: DROPDOWN_COMP,
    placeholder: 'Выберите месяц',
  },
  status: {
    uiType: LIST_COMP,
  },
};

const createFilter = (filterName, filterTypes, filterLists) => {
  const list = compact(reduce(filterLists, (acc, item) => {
    if (item[filterName]) {
      acc.push({
        name: get(item, [filterName]),
      });
    }
    return acc;
  }, []));

  return {
    filterName,
    displayName: filterTypes[filterName],
    component: components[filterName],
    list,
  };
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.RECIEVE_FILTERS: {
      const { raw } = action;
      const firstRow = pullAt(raw, [1]);
      const otherRows = drop(raw, [1]);

      const filters = map(
        supportedFilters,
        (filterName) => createFilter(filterName, firstRow, otherRows)
      );

      return u({
        isReady: true,
        all: {
          ...keyBy(filters, 'filterName'),
        },
      }, state);
    }

    case actionTypes.TOGGLE_FILTER: {
      const { filterName, value, isActive } = action;
      const { active } = state;

      const updatedFilters =
        (isActive)
          ? assign({}, active, { [filterName]: value })
          : omit(active, [filterName]);

      return u({
        active: () => updatedFilters,
      }, state);
    }

    default:
      return state;
  }
}
