import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as RouteTypes from '../constants/route-types.js';

import Deals from './deals.container.jsx';
import Vouchers from './vouchers.container.jsx';
import Filters from './filters.container.jsx';
import DestinationNav from './destinations-nav.container.jsx';

import SiteHeader from '../components/site-header.jsx';
import HomeJumbotron from '../components/home-jumbotron.jsx';

import sheetDatasource from '../datasources/sheet.datasource.jsx';

@sheetDatasource()
class Main extends Component {
  render() {
    return (
      <main className="main">
        <SiteHeader />
        <Route exact path={RouteTypes.ROOT} component={HomeJumbotron} />
        <Route exact path={RouteTypes.ROOT} component={Deals} />
        <Route path={RouteTypes.DESTINATIONS} component={DestinationNav} />
        <Route exact path={`${RouteTypes.VOUCHERS}/:destination/:subdestination`} component={Vouchers} />
      </main>
    );
  }
}

export default Main;
