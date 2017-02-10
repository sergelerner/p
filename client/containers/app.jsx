import React, { Component } from 'react';
import Filters from './filters.container.jsx';
import Vouchers from './vouchers.container.jsx';

class App extends Component {
  render() {
    return (
      <main className="main">
        <h1 className="main__title">С уважением, Ваш и в дальнейшем, Лев Путешественник</h1>
        <Filters />
        <Vouchers />
      </main>
    );
  }
}

export default App;
