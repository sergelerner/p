import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectActiveVoucher } from '../selectors/vouchers.selector.js';

import tourDatasource from '../datasources/tour.datasource.jsx';

import TourDescrition from '../components/tour-description.jsx';

import get from 'lodash/get';

@tourDatasource()
class Tour extends Component {
  render() {
    const {
      isReady,
      content,
      activeVoucher: { extraInfo: { first: extraInfoFirst, second: extraInfoSecond } },
    } = this.props;

    return (
      <main className="tour">

        <header className="tour__header">
          <h1 className="tour-header-title">Русскоязычные туры от  Каспи- Метрополь, Натур, Офир, Эшет, Аркия, Мон</h1>
          <h3 className="tour-header-company-extra-info-first">{extraInfoFirst}</h3>
          <h3 className="tour-header-company-extra-info-second">{extraInfoSecond}</h3>
        </header>

        <section className="tour__description">
          <h2 className="tour__company">Организованный тур от_____</h2>
          <TourDescrition isReady={isReady} content={content} />
        </section>

      </main>
    );
  }
}

Tour.propTypes = {
  content: PropTypes.string,
  isReady: PropTypes.bool.isRequired,
  activeVoucher: PropTypes.shape({
    company: PropTypes.string.isRequired,
    extraInfo: PropTypes.shape({
      first: PropTypes.string,
      second: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state) => ({
  content: get(state, ['tours', 'content']),
  isReady: get(state, ['tours', 'isReady']),
  activeVoucher: selectActiveVoucher(state),
});

export default connect(mapStateToProps)(Tour);
