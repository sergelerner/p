import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadDoc } from '../actions/drive.actions.js';

import get from 'lodash/get';

export default () => (WrappedComponent) => {
  class TourDatasource extends Component {
    componentWillMount() {
      const {
        clientLoadDoc,
        match,
      } = this.props;

      const { voucherId } = get(match, ['params']);

      if (voucherId) {
        clientLoadDoc(voucherId);
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  TourDatasource.propTypes = {
    clientLoadDoc: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  const mapStateToProps = (_state) => ({

  });

  const mapDispatchToProps = (dispatch) => ({
    clientLoadDoc: (voucherId) => {
      dispatch(loadDoc(voucherId));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(TourDatasource);
};
