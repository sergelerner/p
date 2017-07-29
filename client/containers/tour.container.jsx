import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import tourDatasource from '../datasources/tour.datasource.jsx';

import TourDescrition from '../components/tour-description.jsx';

import get from 'lodash/get';

@tourDatasource()
class Tour extends Component {
  render() {
    const { isReady, content } = this.props;
    return (
      <main className={classNames('tour', { loading: !isReady })}>
        <TourDescrition isReady={isReady} content={content} />
      </main>
    );
  }
}

Tour.propTypes = {
  content: PropTypes.string,
  isReady: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  content: get(state, ['tours', 'content']),
  isReady: get(state, ['tours', 'isReady']),
});

export default connect(mapStateToProps)(Tour);
