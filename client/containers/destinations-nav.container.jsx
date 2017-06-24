import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { filterBy } from '../actions/filter.actions.js';

import get from 'lodash/get';
import find from 'lodash/find';
import isArray from 'lodash/isArray';

import levParis from '../assets/photos/lev-paris.png';

class DestinationNav extends Component {
  render() {
    const {
      userFilterBy,
      destinations,
      activeDestination,
    } = this.props;

    let subdestinations = [];

    if (isArray(destinations) && activeDestination) {
      subdestinations = get(find(destinations, { name: activeDestination }), ['subdestinations']);
    }

    return (
      <nav className="destinations-nav">

        <h2 className="destinations-nav__title">Дороги, которые мы выбираем:</h2>

        <div className="destinations-nav__columns">

          <section className="destinations-nav__column destinations-nav__column--destinations">
            <h3 className="destinations-nav__column-title destinations-nav__column-title--destinations">Выбор туров по направлению:</h3>
            <ul className="destinations-nav__list">
              {
                destinations && destinations.map((destination) => (
                  <li
                    key={destination.name}
                    className={classNames('destinations-nav__item destinations-nav__item--destinations', { active: activeDestination === destination.name})}
                    onClick={() => userFilterBy('destination', destination.name, true)}>
                    <span className="destinations-nav__name destinations-nav__name--destinations">{destination.name}</span>
                    <span className="destinations-nav__desc">{destination.desc}</span>
                  </li>
                ))
              }
            </ul>
          </section>

          <section className="destinations-nav__column destinations-nav__column--subdestinations">
            <h3 className="destinations-nav__column-title destinations-nav__column-title--subdestinations">Даты, цены, описания, опции, заказ:</h3>
            <ul className="destinations-nav__list">
              {
                subdestinations && subdestinations.map((subdestination) => (
                  <li
                    key={activeDestination + '-' + subdestination.name}
                    className="destinations-nav__item destinations-nav__item--subdestinations">
                    <span className="destinations-nav__name destinations-nav__name--subdestinations">{subdestination.name}</span>
                  </li>
                ))
              }
            </ul>
          </section>

          <section className="destinations-nav__column destinations-nav__column--art">
            <ul>
              <li className="destinations-nav__photo">
                <img src={levParis} />
              </li>
            </ul>
          </section>

        </div>

      </nav>
    );
  }
}

DestinationNav.propTypes = {
  userFilterBy: PropTypes.func.isRequired,
  destinations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    subdestination: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })),
  })),
  activeDestination: PropTypes.string,
};

const mapStateToProps = (state) => ({
  destinations: get(state, ['filters', 'all', 'destination', 'list']),
  activeDestination: get(state, ['filters', 'active', 'destination']),
});

const mapDispatchToProps = (dispatch) => ({
  userFilterBy: (filterName, value, isActive) => {
    dispatch(filterBy(filterName, value, isActive));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DestinationNav);
