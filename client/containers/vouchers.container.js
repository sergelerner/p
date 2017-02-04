import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

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
    return (
      <Table
        rowsCount={this.state.myTableData.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={500}>
        <Column
          header={<Cell>Name</Cell>}
          cell={props => (
            <Cell {...props}>
              {this.state.myTableData[props.rowIndex].name}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Email</Cell>}
          cell={props => (
            <Cell {...props}>
              {this.state.myTableData[props.rowIndex].name}
            </Cell>
          )}
          width={200}
        />
      </Table>
    );
  }
}

export default Vouchers;
