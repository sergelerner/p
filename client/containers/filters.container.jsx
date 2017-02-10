import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { filterBy } from '../actions/filter.actions.js';

import get from 'lodash/get';

const Filter = ({ filter, userFilter }) => {
  const { filterName, displayName, component, list } = filter;
  return (
    <div className={`filter ${filterName}`}>
      <h3 className="filter__name">{ displayName }</h3>
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
    const { isReady, company, status, userFilterBy } = this.props;
    return (
      <section className="filters">
        {
          isReady && (
            <div>
              <Filter filter={company} userFilter={userFilterBy}/>
              <Filter filter={status} userFilter={userFilterBy}/>
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
  company: filterShapeType,
  status: filterShapeType,
};

const mapStateToProps = (state) => ({
  isReady: get(state, ['filters', 'isReady']),
  company: get(state, ['filters', 'company']),
  status: get(state, ['filters', 'status']),
});

const mapDispatchToProps = (dispatch) => ({
  userFilterBy: (filterName, value, isActive) => {
    dispatch(filterBy(filterName, value, isActive));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
