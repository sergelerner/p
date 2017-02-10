import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { filterBy } from '../actions/filter.actions.js';

import get from 'lodash/get';

const Filter = ({ filter, userFilter }) => {
  const { filterName, displayName, component, list } = filter;
  return (
    <div>
      <h3>{ displayName }</h3>
      <ul className="list">
        {
          list.map(({ name }) => (
            <li
              className="list__item"
              key={name}>
              <button
                onClick={() => userFilter(filterName, name)}>
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
    const { isReady, company, userFilterBy } = this.props;
    return (
      <section className="filters">
        {
          isReady && <Filter filter={company} userFilter={userFilterBy}/>
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
};

const mapStateToProps = (state) => ({
  isReady: get(state, ['filters', 'isReady']),
  company: get(state, ['filters', 'company']),
});

const mapDispatchToProps = (dispatch) => ({
  userFilterBy: (filterName, value) => {
    dispatch(filterBy(filterName, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
