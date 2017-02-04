import React, { Component } from 'react';
import Tabletop from 'tabletop';

Tabletop.init({
  key: process.env.SETTINGS.sheetKey,
  callback: (result, tabletop) => console.log('table result', result),
});

class App extends Component {
  render() {
    return (
      <main>
        <h1>Hello World!</h1>
      </main>
    );
  }
}

export default App;
