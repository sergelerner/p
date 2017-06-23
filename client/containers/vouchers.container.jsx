import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { goToTour } from '../actions/route.actions.js';

import { selectFilteredVouchers } from '../selectors/vouchers.selector.js';

import get from 'lodash/get';

class Vouchers extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  createCellContent(type, content) {
    const d = (<span>{ content }</span>);
    const map = {
      name: (
        <span>{ content }</span>
      ),
      price: (
        <div>
          {
            content && content.split('|').map((item, i) => (
              <span key={i}>{ item }</span>
            ))
          }
        </div>
      ),
      company: (
        <div>
          {
            content && content.split('|').map((item, i) => (
              <span key={i}>{ item }</span>
            ))
          }
        </div>
      ),
    };

    const cellProps = { className: classNames('content', type) };

    return map[type]
      ? React.cloneElement(map[type], cellProps)
      : React.cloneElement(d, cellProps);
  }

  render() {
    const { isReady, head, body, userGoToTour } = this.props;
    return (
      <section className="vouchers">
        {
          isReady && (
            <Table
              rowsCount={ body.length }
              rowHeight={50}
              headerHeight={50}
              width={1200}
              height={500}>
              {
                head.map(({ displayName, colName, isFixed, width }) => (
                  <Column
                    key={colName}
                    fixed={isFixed}
                    width={width || 200}
                    header={<Cell className="vouchers__head">{ displayName }</Cell>}
                    cell={
                      (props) => (
                        <Cell
                          className={classNames('vouchers__cell', { active: !!body[props.rowIndex].description })}
                          onClick={() => !!body[props.rowIndex].description && userGoToTour(body[props.rowIndex].description)}
                          { ...props }>
                          { ::this.createCellContent(colName, body[props.rowIndex][colName]) }
                        </Cell>
                      )
                    }
                  />
                ))
              }
            </Table>
          )
        }
      </section>
    );
  }
}

Vouchers.propTypes = {
  userGoToTour: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired,
  head: PropTypes.array,
  body: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isReady: get(state, ['vouchers', 'isReady']),
  head: get(state, ['vouchers', 'head']),
  body: selectFilteredVouchers(state),

});

const mapDispatchToProps = (dispatch) => ({
  userGoToTour: (id) => {
    dispatch(goToTour(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Vouchers);
