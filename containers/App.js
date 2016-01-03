import React, {Component} from 'react';
import AppBar from 'material-ui/lib/app-bar';
import StockInputSelector from '../components/StockInputSelector';
import StockPortfolioTable from '../components/StockPortfolioTable';
import stockDB from '../data/mockStockDB';
import stockPortfolio from '../data/mockStockPortfolio';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockDB,
      stockPortfolio
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
        <StockPortfolioTable portfolio={stockPortfolio} />
      </div>
    )
  }
}

export default App;
