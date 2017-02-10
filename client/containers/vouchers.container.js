import React, { Component, PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';

import get from 'lodash/get';

class Vouchers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myTableData: [
        { name: 'Rylan', email: 'Angelita_Weimann42@gmail.com' },
        { name: 'Amelia', email: 'Dexter.Trantow57@hotmail.com' },
        { name: 'Estevan', email: 'Aimee7@hotmail.com' },
        { name: 'Florence', email: 'Jarrod.Bernier13@yahoo.com' },
        { name: 'Tressa', email: 'Yadira1@hotmail.com' },
      ],
    };
  }

  render() {
    const { isReady, head, body } = this.props;
    const { myTableData } = this.state;
    return (
      <section className="vouchers">
        {
          isReady && (
            <Table
              rowsCount={ myTableData.length }
              rowHeight={50}
              headerHeight={50}
              width={1000}
              height={500}>
              {
                head.map(({ displayName, colName, isFixed, width }) => (
                  <Column
                    key={colName}
                    fixed={isFixed}
                    width={width || 200}
                    header={<Cell>{ displayName }</Cell>}
                    cell={
                      (props) => (
                        <Cell { ...props }>
                          { body[props.rowIndex][colName] }
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
