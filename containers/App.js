import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import StockInputSelector from '../components/StockInputSelector';
import StockPortfolioTable from '../components/StockPortfolioTable';
import StockInputForm from '../components/StockInputForm';
import stockDB from '../data/mockStockDB';
import stockPortfolio from '../data/mockStockPortfolio';

const hide = {
  display: 'none'
};

const show = {
  display: 'inline'
};

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

  handleSelect(stock) {
    this.setState({
      stockToAdd: stock,
      isAddingStock: true
    });
  }

  handleAdd(stock) {
    const { stockPortfolio } = this.state;
    stock.id = ~~ (Date.now() * Math.random());
    this.setState({
      stockPortfolio: stockPortfolio.concat(stock),
      isAddingStock: false
    });
  }

  handleCancel() {
    this.setState({
      isAddingStock: false
    });
  }

  handleRemove(id){
    const { stockPortfolio } = this.state;
    this.setState({
      stockPortfolio: stockPortfolio.filter(stock => stock.id !== id)
    });
  }

  render() {
    const {stockPortfolio, isAddingStock, stockToAdd} = this.state;

    return (
      <div>
        <AppBar
          title="React Material-UI Stock App Example"
        />
        <br />
        <StockInputSelector handleSelectAutoComplete={this.handleSelect.bind(this)}/>
        <br />
        {isAddingStock ? <StockInputForm
                            name={stockToAdd.name}
                            ticker={stockToAdd.ticker}
                            handleCancel={this.handleCancel.bind(this)}
                            handleAdd={this.handleAdd.bind(this)}
                          /> : null
        }
        <StockPortfolioTable
          portfolio={stockPortfolio}
          handleRemove={this.handleRemove.bind(this)}
        />
      </div>
    )
  }
}

export default App;
