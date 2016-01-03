import React, {Component} from 'react';
import AppBar from 'material-ui/lib/app-bar';
import StockInputSelector from '../components/StockInputSelector';
import StockPortfolioTable from '../components/StockPortfolioTable';
import StockInputForm from '../components/StockInputForm';
import stockDB from '../data/mockStockDB';
import stockPortfolio from '../data/mockStockPortfolio';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockDB,
      stockPortfolio,
      isAddingStock: false,
      stockToAdd: ""
    };
  }

  render() {
    const {stockPortfolio} = this.state;

    return (
      <div>
        <AppBar
          title="React Material-UI Stock App Example"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <br />
        <StockInputSelector />
        <StockInputForm name="Stock Name" ticker="Stock Ticker"/>
        <StockPortfolioTable portfolio={stockPortfolio} />
      </div>
    )
  }
}

export default App;
