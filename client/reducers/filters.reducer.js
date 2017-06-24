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
import filter from 'lodash/filter';

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
  'destination',
  'subdestination',
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
      switch (filterName) {

        case 'destination': {
          const name = get(item, [filterName]);
          acc.push({
            name,
            desc: get(filter(filterLists, { destination: name }), [0, 'destination_desc']),
            subdestinations: reduce(filterLists, (acc2, item2) => {
              if (item2[name]) {
                acc2.push({
                  name: item2[name],
                });
              }
              return acc2;
            }, []),
          });
          break;
        }

        default:
          acc.push({
            name: get(item, [filterName]),
          });
      }
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
      const {
        basic,
        destination,
        subdestination,
        destination2subdestination,
      } = action;

      return u({
        isReady: true,
        all: keyBy(
          map(
            supportedFilters,
            (filterName) => createFilter(
              filterName,
              {
                ...pullAt(basic, [1]),
                ...pullAt(destination, [1]),
                ...pullAt(subdestination, [1]),
              },
              [
                ...drop(basic, [1]),
                ...drop(destination, [1]),
                ...drop(subdestination, [1]),
                ...drop(destination2subdestination, [1]),
              ]
            )
          ),
          'filterName'
        ),
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
