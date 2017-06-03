import React, { Component } from 'react';

import Deals from './deals.container.jsx';

import SiteHeader from '../components/site-header.jsx';
import HomeJumbotron from '../components/home-jumbotron.jsx';


class Main extends Component {
  render() {
    return (
      <main className="main">
        <SiteHeader />
        <HomeJumbotron />
        <Deals />
      </main>
    );
  }
}

export default Main;
