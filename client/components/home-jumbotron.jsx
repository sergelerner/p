import React, { Component } from 'react';

import russianToursHeading from '../assets/photos/russian-tours-heading.png';
import homePicture from '../assets/photos/home-picture.png';

class HomeJumbotron extends Component {
  render() {
    return (
      <article className="home-jumbotron">
        <h3 className="home-jumbotron__first-title">Быстрый поиск нужного Вам тура по выбранным выше параметрам</h3>
        <h3 className="home-jumbotron__second-title">Все фирмы и их бонусы, все туры, все даты + наши скидки</h3>
        <div className="home-jumbotron__third-title">
          <img src={russianToursHeading}/>
        </div>
        <div className="home-jumbotron__photo">
          <img src={homePicture}/>
        </div>
      </article>
    );
  }
}

export default HomeJumbotron;
