import React, { Component, PropTypes } from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import realTimeStockDB from '../data/mockStockDB';
import numeral from 'numeral';
import FlatButton from 'material-ui/lib/flat-button';

const loss = {
  color: 'red'
};

const gain = {
  color: 'green'
};

const propTypes = {
  portfolio: PropTypes.array.isRequired,
  handleRemove: PropTypes.func,
};

class StockPortfolioTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: false,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: true,
      selectable: true,
      displaySelectAll: false,
      displayRowCheckbox: false,
    };
  }

  handleRemove(id) {
    this.props.handleRemove(id);
  }

  renderStockRows() {
    const { portfolio } = this.props;
    return portfolio.map( stock => {

      const originalTotalPrice = stock.numShares * stock.purchasePrice,
            realTimeStockQuote = realTimeStockDB.filter(el =>  el.ticker === stock.ticker)[0].currentPrice,
            currentTotalPrice = stock.numShares * realTimeStockQuote;

    return (
        <TableRow key={stock.id}>
            <TableRowColumn colSpan="2">{stock.name}</TableRowColumn>
            <TableRowColumn>{stock.ticker}</TableRowColumn>
            <TableRowColumn>{stock.numShares}</TableRowColumn>
            <TableRowColumn>{numeral(stock.purchasePrice).format('$0,0.00')}</TableRowColumn>
            <TableRowColumn>{numeral(originalTotalPrice).format('$0,0.00')}</TableRowColumn>
            <TableRowColumn>{numeral(currentTotalPrice).format('$0,0.00')}</TableRowColumn>
            <TableRowColumn style={(currentTotalPrice - originalTotalPrice) < 0 ? loss : gain}>{numeral(currentTotalPrice - originalTotalPrice).format('$0,0.00')}</TableRowColumn>
            <TableRowColumn>
              <FlatButton
                label="Remove"
                primary={true}
                onClick={this.handleRemove.bind(this, stock.id)}
              />
            </TableRowColumn>
        </TableRow>
      )
    })
  }

  renderEmptyPortfolio() {
    return (
      <TableRow>
        <TableRowColumn
          colSpan="9"
          style={{textAlign: 'center'}}
        >
          You have no stocks
        </TableRowColumn>
      </TableRow>
    )
  }

  calculatePortfolioTotals(portfolio) {
    let totals = { original: 0, current: 0 }

    return portfolio.reduce( (acc, stock ) => {
      const currentStockQuote = realTimeStockDB.filter(el =>  el.ticker === stock.ticker)[0].currentPrice;
      acc.original = acc.original + (stock.purchasePrice * stock.numShares);
      acc.current = acc.current + (currentStockQuote * stock.numShares);
      return acc;
    }, totals );
  }

  render() {
    const { portfolio } = this.props;
    const totals = this.calculatePortfolioTotals(portfolio);

    return(
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
        <TableHeader
          displaySelectAll={this.state.displaySelectAll}>
          <TableRow>
            <TableHeaderColumn colSpan="8" tooltip='Super Header' style={{textAlign: 'center', fontSize: 'large'}}>
              Your Stock Portfolio
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip='Company Name'>Name</TableHeaderColumn>
            <TableHeaderColumn tooltip='Ticker Symbol'>Symbol</TableHeaderColumn>
            <TableHeaderColumn tooltip='Number of Shares Owned'># Shares</TableHeaderColumn>
            <TableHeaderColumn tooltip='Price Purchased'>Price Purchased</TableHeaderColumn>
            <TableHeaderColumn tooltip='Total Amount When Purchased'>Original Total Amount</TableHeaderColumn>
            <TableHeaderColumn tooltip='Current Market Total Amount'>Current Total Amount</TableHeaderColumn>
            <TableHeaderColumn tooltip='Loss/Gain'>Loss/Gain</TableHeaderColumn>
            <TableHeaderColumn tooltip='Remove'>Remove/Gain</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
          displayRowCheckbox={this.state.displayRowCheckbox}
        >
        {portfolio.length !== 0 ? this.renderStockRows() : this.renderEmptyPortfolio()}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn colSpan="3" />
            <TableRowColumn style={{textAlign: 'right', fontWeight:'bold'}}>Totals:</TableRowColumn>
            <TableRowColumn>{numeral(totals.original).format('$0,0.00')}</TableRowColumn>
            <TableRowColumn>{numeral(totals.current).format('$0,0.00')}</TableRowColumn>
            <TableRowColumn
              colSpan="2"
              style={(totals.current - totals.original) < 0 ? loss : gain}
            >
            {numeral(totals.current - totals.original).format('$0,0.00')}
            </TableRowColumn>
          </TableRow>
        </TableFooter>
        </Table>
    )
  }
}

StockPortfolioTable.propTypes = propTypes;

export default StockPortfolioTable;
