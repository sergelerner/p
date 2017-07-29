import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSheet, loadDoc } from '../actions/drive.actions.js';
import { setActiveVoucher } from '../actions/vouchers.actions.js';

import get from 'lodash/get';

export default () => (WrappedComponent) => {
  class TourDatasource extends Component {
    componentWillMount() {
      const {
        hasVouchers,
        clientLoadSheet,
        clientLoadDoc,
        clientSetActiveVoucher,
        match,
      } = this.props;

      const { voucherId } = get(match, ['params']);

      if (!hasVouchers) {
        clientLoadSheet();
      }

      if (voucherId) {
        clientSetActiveVoucher(voucherId);
        clientLoadDoc(voucherId);
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
    clientSetActiveVoucher: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state) => ({
    hasVouchers: get(state, ['vouchers', 'isReady']),
  });

  const mapDispatchToProps = (dispatch) => ({
    clientLoadSheet: () => dispatch(loadSheet()),
    clientLoadDoc: (voucherId) => dispatch(loadDoc(voucherId)),
    clientSetActiveVoucher: (voucherId) => dispatch(setActiveVoucher(voucherId)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(TourDatasource);
};
