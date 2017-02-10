import React, { Component, PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';

import get from 'lodash/get';

class Vouchers extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  createCellContent(type, content) {
    const d = (<span className={type}>{ content }</span>);
    const map = {
      name: (
        <span className={type}>{ content }</span>
      ),
      price: (
        <div className={type}>
          {
            content && content.split('|').map((item, i) => (
              <span key={i}>{ item }</span>
            ))
          }
        </div>
      ),
    };

    return map[type]
      ? React.cloneElement(map[type])
      : React.cloneElement(d);
  }

  render() {
    const { isReady, head, body } = this.props;
    return (
      <section className="vouchers">
        {
          isReady && (
            <Table
              rowsCount={ body.length }
              rowHeight={50}
              headerHeight={50}
              width={1100}
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
                        <Cell className="vouchers__cell" { ...props }>
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
  isReady: PropTypes.bool.isRequired,
  head: PropTypes.array,
  body: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isReady: get(state, ['vouchers', 'isReady']),
  head: get(state, ['vouchers', 'head']),
  body: get(state, ['vouchers', 'body']),

});

export default connect(mapStateToProps)(Vouchers);
