import React, { Component } from 'react';
import Filters from './filters.container.jsx';
import Vouchers from './vouchers.container.jsx';

class Main extends Component {
  render() {
    return (
      <main className="main">
        <header className="header">
          <h1 className="header__title">С уважением, Ваш и в дальнейшем, Лев Путешественник</h1>
        </header>
        <Filters />
        <Vouchers />
      </main>
    );
  }
}

export default Main;
