import React, { Component } from 'react';

import isEmpty from 'lodash/isEmpty';

export default (prop) => (WrappedComponent) => class Loader extends Component {
  render() {
    const shouldDisplayLoader = isEmpty(this.props[prop]);

    return (shouldDisplayLoader)
      ? <div className="spinner"></div>
      : <WrappedComponent {...this.props}/>;
  }
};
