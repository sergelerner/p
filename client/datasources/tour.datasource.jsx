import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSheet, loadDoc } from '../actions/drive.actions.js';

import get from 'lodash/get';

export default () => (WrappedComponent) => {
  class TourDatasource extends Component {
    componentWillMount() {
      const {
        hasVouchers,
        clientLoadSheet,
        clientLoadDoc,
        match,
      } = this.props;

      const { voucherId } = get(match, ['params']);

      if (!hasVouchers) {
        clientLoadSheet().then(() => {
          if (voucherId) {
            clientLoadDoc(voucherId);
          }
        });
      } else {
        if (voucherId) {
          clientLoadDoc(voucherId);
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  TourDatasource.propTypes = {
    hasVouchers: PropTypes.bool.isRequired,
    clientLoadSheet: PropTypes.func.isRequired,
    clientLoadDoc: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state) => ({
    hasVouchers: get(state, ['vouchers', 'isReady']),
  });

  const mapDispatchToProps = (dispatch) => ({
    clientLoadSheet: () => dispatch(loadSheet()),
    clientLoadDoc: (voucherId) => {
      dispatch(loadDoc(voucherId));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(TourDatasource);
};
