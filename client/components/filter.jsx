import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SelectFilter from './select-filter.jsx';

import * as componentTypes from '../constants/filter-component-types.js';

const Filter = ({ filter, userFilter }) => {
  const { filterName, component, list } = filter;
  const { uiType, placeholder } = component;
  return (
    <div className={`filter ${filterName}`}>
      {
        (() => {
          switch (uiType) {
            case componentTypes.LIST_COMP: {
              return (
                <ul className="filter__list">
                  {
                    list.map(({ name, isActive }) => (
                      <li
                        className={classNames('filter__item', { active: isActive })}
                        key={name}>
                        <button
                          onClick={() => userFilter(filterName, name, !isActive)}>
                          { name }
                        </button>
                      </li>
                    ))
                  }
                </ul>
              );
            }

            case componentTypes.DROPDOWN_COMP: {
              return (
                <SelectFilter
                  placeholder={placeholder}
                  filterName={filterName}
                  list={list}
                  userFilter={userFilter}/>
              );
            }

            default:
              return null;
          }
        })()
      }
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.shape({
    filterName: PropTypes.string,
    displayName: PropTypes.string,
    component: PropTypes.shape({
      uiType: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }).isRequired,
    list: PropTypes.array,
  }),
  userFilter: PropTypes.func.isRequired,
};

export default Filter;
