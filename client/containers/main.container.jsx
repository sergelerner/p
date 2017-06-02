import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import * as RouteTypes from '../constants/route-types.js';
import Filters from './filters.container.jsx';
import Vouchers from './vouchers.container.jsx';

import SiteHeader from '../components/site-header.jsx';
import HomeJumbotron from '../components/home-jumbotron.jsx';

class Main extends Component {
  render() {
    return (
      <main className="main">
        <SiteHeader />

        <nav>
          <NavLink exact activeClassName="active" to={RouteTypes.ROOT}>Главная</NavLink>
          <NavLink activeClassName="active" to={RouteTypes.DESTINATIONS}>Туры  по направлениям</NavLink>
        </nav>

        <HomeJumbotron />

        <Filters />
        <Vouchers />
      </main>
    );
  }
}

export default Main;
