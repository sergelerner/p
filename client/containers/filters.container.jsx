import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';
import keyBy from 'lodash/keyBy';

const Filter = ({ filter }) => {
  const { filterName, displayName, component, list } = filter;
  return (
    <div>
      <h3>{ displayName }</h3>
      <ul className="list">
        {
          list.map((item) => (
            <li
              className="list__item"
              key={item}>
              <button>
                { item }
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
};

class Filters extends Component {
  render() {
    const { isReady, filters } = this.props;
    const { company } = filters;
    return (
      <section className="filters">
        {
          isReady && <Filter filter={company} />
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
  isReady: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    company: filterShapeType,
    country: filterShapeType,
    city: filterShapeType,
    category1: filterShapeType,
    category2: filterShapeType,
    category3: filterShapeType,
    guide: filterShapeType,
    month: filterShapeType,
    status: filterShapeType,
  }),
};

const mapStateToProps = (state) => ({
  isReady: get(state, ['filters', 'isReady']),
  filters: keyBy(get(state, ['filters', 'list']), 'filterName'),
});

export default connect(mapStateToProps)(Filters);
