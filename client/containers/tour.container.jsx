import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectActiveVoucher } from '../selectors/vouchers.selector.js';

import tourDatasource from '../datasources/tour.datasource.jsx';

import TourDescrition from '../components/tour-description.jsx';

import levLogo from '../assets/photos/lev-logo.png';

import get from 'lodash/get';

@tourDatasource()
class Tour extends Component {
  render() {
    const {
      isReady,
      content,
      activeVoucher: {
        company: companyName,
        extraInfo: { first: extraInfoFirst, second: extraInfoSecond },
      },
    } = this.props;

    return (
      <main className="main tour">

        <header className="tour__header">
          <div className="tour-header">
            <div className="tour-header__btn">
              <button>Вернуться</button>
            </div>
            <div className="tour-header__content">
              <h1 className="tour-header-title">Русскоязычные туры от  Каспи- Метрополь, Натур, Офир, Эшет, Аркия, Мон</h1>
              <h3 className="tour-header-company-extra-info-first">{extraInfoFirst}</h3>
              <h3 className="tour-header-company-extra-info-second">{extraInfoSecond}</h3>
            </div>
            <div className="tour-header__logo">
              <img src={levLogo} />
            </div>
          </div>
        </header>

        <section className="tour__description">
          <h2 className="tour__company">{`Организованный тур от ${companyName}:`}</h2>
          <TourDescrition isReady={isReady} content={content} />

          <div className="tour__additional-details">
            <i>*Возможны изменения в порядке посещений</i>
            <div>
              <h4>В стоимость включено:</h4>
              <ul>
                <li>-авиационные и прочие налоги и сборы по состоянию на 20.05.2017.</li>
                <li>-комфортабельный туристический автобус в соответствии с программой;</li>
                <li>-чаевые для обслуживающего персонала (не включая чаевые гиду группы).</li>
              </ul>
            </div>
            <div>
              <h4>Опции (Цены даны в евро):</h4>
              <p>Аттракции, предлагаемые туристам в свободное время. Передвижение на общественном транспорте. Личную  страховку. Все, что не внесено в пункт "цена тура включает". Городской налог оплачивается самостоятельно в гостинице.</p>
            </div>
          </div>

          <div className="tour__order">
            <div className="tour-order">
              <h5 className="tour-order__title">Для перехода к бронированию тура на выбранную Вами дату нажмите:</h5>
              <button className="tour-order__btn">Заявка</button>
              <p className="tour-order__desc">В бланке <strong>Заявка</strong> Вы заполняете только Ваши контактные данные. Окончательное оформление заказа после консультации с нашим представителем по телефону, предоплате  и нашему письменному подтверждению цены и наличию мест.</p>
              <h3 className="tour-order__salute">С уважением, Ваш и в дальнейшем, Лев Путешественник</h3>
              <div className="tour-order__contact-info">
                <h4 className="phone">03-6026443</h4>
                <h1 className="email">lev.put@gmail.com</h1>
                <h4 className="phone">054-4534590</h4>
              </div>
            </div>
          </div>
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
