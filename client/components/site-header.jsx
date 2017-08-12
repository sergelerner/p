import React, { Component } from 'react';

import SiteNavigation from './site-navigation.jsx';

import levPhoto from '../assets/photos/lev.png';
import tamaraPhoto from '../assets/photos/tamara.png';

class SiteHeader extends Component {
  render() {
    return (
      <header className="site-header">

        <div className="site-header__iata">
          <h4 className="iata-text">Гарантия услуг осуществляется по лицензии Ассоциации по туризму Израиля Shosh Tours Ltd. iata: 57202443</h4>
        </div>

        <div className="site-header__hat">
          <div className="site-header__photo">
            <img src={levPhoto} />
          </div>
          <div className="site-header__title-block">
            <h2 className="site-header__url">www.lev-puteshestvennik.com</h2>
            <h3 className="site-header__quote">- Весь мир у Вас на ладони -</h3>
          </div>
          <div className="site-header__photo">
            <img src={tamaraPhoto} />
          </div>
        </div>

        <div className="site-header__salutation">
          <h4 className="site-header__phone">03-6026443</h4>
          <h1 className="site-header__salute">С уважением, Ваш и в дальнейшем, Лев Путешественник</h1>
          <h4 className="site-header__phone">054-4534590</h4>
        </div>

        <SiteNavigation />
      </header>
    );
  }
}

export default SiteHeader;
