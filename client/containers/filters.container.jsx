import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Filter from '../components/filter.jsx';

import { filterBy } from '../actions/filter.actions.js';

import get from 'lodash/get';

class Filters extends Component {
  render() {
    const {
      isReady,
      months,
      company,
      userFilterBy,
    } = this.props;
    return (
      <section className="filters">
        {
          isReady && (
            <div>
              <div className="group">
                <Filter filter={company} userFilter={userFilterBy}/>
                <Filter filter={months} userFilter={userFilterBy}/>
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
  component: PropTypes.object,
  list: PropTypes.array,
});

Filters.propTypes = {
  userFilterBy: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired,
  company: filterShapeType,
  months: filterShapeType,
};

const mapStateToProps = (state) => ({
  isReady: get(state, ['filters', 'isReady']),
  company: get(state, ['filters', 'all', 'company']),
  months: get(state, ['filters', 'all', 'months']),
});

const mapDispatchToProps = (dispatch) => ({
  userFilterBy: (filterName, value, isActive) => {
    dispatch(filterBy(filterName, value, isActive));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
