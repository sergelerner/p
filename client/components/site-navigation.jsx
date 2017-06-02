import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import * as RouteTypes from '../constants/route-types.js';

class SiteNavigation extends Component {
  render() {
    return (
      <nav className="site-navigation">
        <ul className="site-navigation__items">
          <li className="site-navigation__item">
            <NavLink exact activeClassName="active" to={RouteTypes.ROOT}>Главная</NavLink>
          </li>
         <li className="site-navigation__item">
          <NavLink activeClassName="active" to={RouteTypes.DESTINATIONS}>Туры  по направлениям</NavLink>
         </li>
        </ul>
      </nav>
    );
  }
}

export default SiteNavigation;
