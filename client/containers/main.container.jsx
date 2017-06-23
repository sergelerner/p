import React, { Component } from 'react';

import Deals from './deals.container.jsx';
import Vouchers from './vouchers.container.jsx';
import Filters from './filters.container.jsx';

import SiteHeader from '../components/site-header.jsx';
import HomeJumbotron from '../components/home-jumbotron.jsx';

import sheetDatasource from '../datasources/sheet.datasource.jsx';

@sheetDatasource()
class Main extends Component {
  render() {
    return (
      <main className="main">
        <SiteHeader />
        <HomeJumbotron />
        <Deals />
        <Filters />
        <Vouchers />
      </main>
    );
  }
}

export default Main;
