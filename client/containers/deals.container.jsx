import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { prepareImage } from '../utils/cloudinary.js';

import loader from '../hocs/loader.hoc.js';

import get from 'lodash/get';
import toArray from 'lodash/toArray';

@loader('deals')
class Deals extends Component {
  render() {
    const { deals } = this.props;
    return (
      <article className="deals">
        <ul className="deals__list">
          {
            deals.map((deal) => (
              <li key={deal.name} className="deal">
                <img className="deal__photo" src={prepareImage(deal.photo, 'c_lpad,h_300,w_300')} />
                <h3 className="deal__title">{deal.name}</h3>
                <h4 className="deal__subtitle">
                  <span className="deal__date">{deal.date}</span>
                  <span className="deal__price">{deal.price}</span>
                  <span className="deal__coin">{deal.coin}</span>
                </h4>
              </li>
            ))
          }
        </ul>
      </article>
    );
  }
}

Deals.propTypes = {
  deals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    coin: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })),
};

const mapStateToProps = (state) => ({
  deals: toArray(get(state, ['deals', 'list'])),
});


export default connect(mapStateToProps)(Deals);
