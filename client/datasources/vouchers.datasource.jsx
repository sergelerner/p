import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { filterBy } from '../actions/filter.actions.js';

import get from 'lodash/get';

export default () => (WrappedComponent) => {
  class VouchersDatasource extends Component {
    componentWillMount() {
      const { match, clientFilterBy } = this.props;
      const { destination, subdestination } = get(match, ['params']);

      if (destination) {
        clientFilterBy('destination', destination, true);
      }

      if (subdestination) {
        clientFilterBy('subdestination', subdestination, true);
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  VouchersDatasource.propTypes = {
    match: PropTypes.object.isRequired,
    clientFilterBy: PropTypes.func.isRequired,
  };

  const mapStateToProps = (_state) => ({

  });

  const mapDispatchToProps = (dispatch) => ({
    clientFilterBy: (filterName, value, isActive) => {
      dispatch(filterBy(filterName, value, isActive));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(VouchersDatasource);
};
