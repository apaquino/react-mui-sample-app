import React, { Component, PropTypes } from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import numeral from 'numeral';
import FlatButton from 'material-ui/lib/flat-button';

const loss = {
  color: 'red'
};

const gain = {
  color: 'green'
};

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  numShares: PropTypes.number.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  originalTotalPrice: PropTypes.number.isRequired,
  currentTotalPrice: PropTypes.number.isRequired,
  handleRemove: PropTypes.func,
};

class StockTableRow extends Component {
  handleRemoveButtonClick(id) {
    this.props.handleRemove(id);
  }

  render() {
    const {
      id,
      name,
      ticker,
      numShares,
      purchasePrice,
      originalTotalPrice,
      currentTotalPrice,
    } = this.props;

    return (
      <TableRow>
          <TableRowColumn colSpan="2">{name}</TableRowColumn>
          <TableRowColumn>{ticker}</TableRowColumn>
          <TableRowColumn>{numShares}</TableRowColumn>
          <TableRowColumn>{numeral(purchasePrice).format('$0,0.00')}</TableRowColumn>
          <TableRowColumn>{numeral(originalTotalPrice).format('$0,0.00')}</TableRowColumn>
          <TableRowColumn>{numeral(currentTotalPrice).format('$0,0.00')}</TableRowColumn>
          <TableRowColumn style={(currentTotalPrice - originalTotalPrice) < 0 ? loss : gain}>{numeral(currentTotalPrice - originalTotalPrice).format('$0,0.00')}</TableRowColumn>
          <TableRowColumn>
            <FlatButton
              label="Remove"
              primary={true}
              onClick={this.handleRemoveButtonClick.bind(this, id)}
            />
          </TableRowColumn>
      </TableRow>
    )
  }
}

StockTableRow.propTypes = propTypes;

export default StockTableRow;
