import React, { Component } from 'react';
import Filters from './filters.container.jsx';
import Vouchers from './vouchers.container.jsx';

import SiteHeader from '../components/site-header.jsx';
import HomeJumbotron from '../components/home-jumbotron.jsx';

class Main extends Component {
  render() {
    return (
      <main className="main">
        <SiteHeader />

        <HomeJumbotron />

        <Filters />
        <Vouchers />
      </main>
    );
  }
}

export default Main;
