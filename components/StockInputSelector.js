import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/lib/auto-complete.js';
import stockDB from '../data/mockStockDB';

const propTypes = {
  handleSelectAutoComplete: PropTypes.func,
};

class StockInputSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockDB: stockDB.map(el => `${el.name} - ${el.ticker}`),
    };
  }

  onUpdateInput(text) {
    const filteredStockDB = stockDB.filter((stock) => {
      return stock.name.toLowerCase().includes(text.toLowerCase()) ||
             stock.ticker.includes(text.toUpperCase());
    });

    this.setState({
      stockDB: filteredStockDB.map(el => `${el.name} - ${el.ticker}`)
    });
  }

  onNewRequest(text, index) {
    this.props.handleSelectAutoComplete(stockDB[index]);
    this.refs.stockSearch.setValue("");
  }

  render() {
    return(
      <div>
      <AutoComplete
        fullWidth={true}
        hintText="Enter stock name or ticker to add"
        dataSource={this.state.stockDB}
        onUpdateInput={(t) => { this.onUpdateInput(t);}}
        showAllItems={true}
        onNewRequest={(t, idx) => { this.onNewRequest(t, idx) }}
        ref="stockSearch"
      />
      </div>
    )
  }
}

StockInputSelector.propTypes = propTypes;

export default StockInputSelector;
