import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';

class Tour extends Component {
  render() {
    const { content } = this.props;
    return (
      <main className="tour">
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </main>
    );
  }
}

Tour.propTypes = {
  content: PropTypes.string,
};

const mapStateToProps = (state) => ({
  content: get(state, ['tours', 'content']),
});

export default connect(mapStateToProps)(Tour);
