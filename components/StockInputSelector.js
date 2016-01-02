import React, {Component} from 'react';
import AutoComplete from 'material-ui/lib/auto-complete.js';
import stockDB from '../data/mockStockDB';


class StockInputSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockDB: stockDB.map(el => `${el.name} - ${el.ticker}`),
      selectedStock: ""
    };
  }

  onUpdateInput(text) {
    const filteredStockDB = stockDB.filter((stock) => {
      return stock.name.toLowerCase().includes(text.toLowerCase()) ||
             stock.ticker.includes(text.toUpperCase());
    });

    this.setState({
      stockDB: filteredStockDB.map(el => `${el.name} - ${el.ticker}`)
    })
  }

  onNewRequest(text, index) {
    this.setState({
      selectedStock: stockDB[index]
    })
  }

  render() {
    return(
      <div>
      <AutoComplete
        fullWidth={true}
        hintText="Enter stock name or ticker"
        dataSource={this.state.stockDB}
        onUpdateInput={(t) => { this.onUpdateInput(t);}}
        showAllItems={true}
        onNewRequest={(t, idx) => { this.onNewRequest(t, idx) }}
      />
      </div>
    )
  }
}

export default StockInputSelector;
