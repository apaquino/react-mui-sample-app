import React, {Component} from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import realTimeStockDB from '../data/mockStockDB';


class StockPortfolioTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: false,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
    };
  }

  renderStockRows() {
    console.log("renderStockRows ran")
    const { portfolio } = this.props;
    return portfolio.map( stock => {

      const originalTotalPrice = stock.numShares * stock.purchasePrice,
            realTimeStockQuote = realTimeStockDB.filter(el =>  el.ticker === stock.ticker)[0].currentPrice,
            currentTotalPrice = stock.numShares * realTimeStockQuote;

    return (
        <TableRow key={stock.id}>
            <TableRowColumn>{stock.name}</TableRowColumn>
            <TableRowColumn>{stock.ticker}</TableRowColumn>
            <TableRowColumn>{stock.numShares}</TableRowColumn>
            <TableRowColumn>{stock.purchasePrice}</TableRowColumn>
            <TableRowColumn>{originalTotalPrice}</TableRowColumn>
            <TableRowColumn>{currentTotalPrice}</TableRowColumn>
            <TableRowColumn>{currentTotalPrice - originalTotalPrice}</TableRowColumn>
        </TableRow>
      )
    })
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

    console.log(totals)
    return(
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
        onRowSelection={this._onRowSelection}
      >
      <TableHeader enableSelectAll={this.state.enableSelectAll}>
        <TableRow>
          <TableHeaderColumn colSpan="7" tooltip='Super Header' style={{textAlign: 'center', fontSize: 'medium'}}>
            Stock Portfolio
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn tooltip='Company Name'>Name</TableHeaderColumn>
          <TableHeaderColumn tooltip='Ticker Symbol'>Symbol</TableHeaderColumn>
          <TableHeaderColumn tooltip='Number of Shares Owned'># Shares</TableHeaderColumn>
          <TableHeaderColumn tooltip='Price Purchased'>Price Purchased</TableHeaderColumn>
          <TableHeaderColumn tooltip='Total Amount When Purchased'>Original Total Amount</TableHeaderColumn>
          <TableHeaderColumn tooltip='Current Market Total Amount'>Current Total Amount</TableHeaderColumn>
          <TableHeaderColumn tooltip='Lost/Gain'>Lost/Gain</TableHeaderColumn>
        </TableRow>
      </TableHeader>

      <TableBody
        deselectOnClickaway={this.state.deselectOnClickaway}
        showRowHover={this.state.showRowHover}
        stripedRows={this.state.stripedRows}
      >
      {this.renderStockRows()}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableRowColumn colSpan="4" />
          <TableRowColumn>{totals.original}</TableRowColumn>
          <TableRowColumn>{totals.current}</TableRowColumn>
          <TableRowColumn>{totals.current - totals.original}</TableRowColumn>
        </TableRow>
      </TableFooter>
      </Table>
    )
  }
}

export default StockPortfolioTable;
