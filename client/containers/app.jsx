import React, { Component } from 'react';
import Vouchers from './vouchers.container.js';

class App extends Component {
  render() {
    return (
      <main className="main">
        <h1 className="main__title">С уважением, Ваш и в дальнейшем, Лев Путешественник</h1>
        <Vouchers />
      </main>
    );
  }
}

export default App;
