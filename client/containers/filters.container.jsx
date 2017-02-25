import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import SelectFilter from '../components/select-filter.jsx';

import * as componentTypes from '../constants/filter-component-types.js';

import { filterBy } from '../actions/filter.actions.js';

import get from 'lodash/get';

const Filter = ({ filter, userFilter }) => {
  const { filterName, displayName, placeholder, component, list } = filter;
  return (
    <div className={`filter ${filterName}`}>
      {
        (() => {
          switch (component) {
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
    component: PropTypes.string,
    list: PropTypes.array,
  }),
  userFilter: PropTypes.func.isRequired,
};

class Filters extends Component {
  render() {
    const {
      isReady,
      category1,
      months,
      country,
      company,
      guide,
      userFilterBy,
    } = this.props;
    return (
      <section className="filters">
        {
          isReady && (
            <div>
              <div className="group">
                <Filter filter={category1} userFilter={userFilterBy}/>
                <Filter filter={months} userFilter={userFilterBy}/>
                <Filter filter={company} userFilter={userFilterBy}/>
                <Filter filter={guide} userFilter={userFilterBy}/>
              </div>
            </div>
          )
        }
      </section>
    );
  }
}

const filterShapeType = PropTypes.shape({
  filterName: PropTypes.string,
  displayName: PropTypes.string,
  component: PropTypes.string,
  list: PropTypes.array,
});

Filters.propTypes = {
  userFilterBy: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired,
  category1: filterShapeType,
  company: filterShapeType,
  guide: filterShapeType,
  months: filterShapeType,
};

const mapStateToProps = (state) => ({
  isReady: get(state, ['filters', 'isReady']),
  category1: get(state, ['filters', 'category1']),
  company: get(state, ['filters', 'company']),
  guide: get(state, ['filters', 'guide']),
  months: get(state, ['filters', 'months']),
});

const mapDispatchToProps = (dispatch) => ({
  userFilterBy: (filterName, value, isActive) => {
    dispatch(filterBy(filterName, value, isActive));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
