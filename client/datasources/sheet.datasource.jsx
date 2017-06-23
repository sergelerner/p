import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSheet } from '../actions/drive.actions.js';

export default () => (WrappedComponent) => {
  class SheetDatasource extends Component {
    componentWillMount() {
      const { clientLoadSheet } = this.props;
      clientLoadSheet();
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  SheetDatasource.propTypes = {
    clientLoadSheet: PropTypes.func.isRequired,
  };

  const mapStateToProps = (_state) => ({});

  const mapDispatchToProps = (dispatch) => ({
    clientLoadSheet: () => {
      dispatch(loadSheet());
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(SheetDatasource);
};
