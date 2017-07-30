import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from './spinner.jsx';

class TourDescrition extends Component {
  render() {
    const { isReady, content } = this.props;

    return (!isReady)
      ? <Spinner />
      : <div className="tour-description" dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
}

TourDescrition.propTypes = {
  isReady: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};

export default TourDescrition;
