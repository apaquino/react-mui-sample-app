import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class StockInputForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    handleAdd: PropTypes.func,
    handleCancel: PropTypes.func,
  }

  handleClickAddButton = (e) => {
    e.preventDefault();
    const {
      name,
      ticker,
      numShares,
      purchasePrice,
    } = this.refs;

    const newStock = {
      name: name.getValue(),
      ticker: ticker.getValue(),
      numShares: Number(numShares.getValue()),
      purchasePrice: Number(purchasePrice.getValue()),
    };

    if (!newStock.numShares || !newStock.purchasePrice) {
      alert("Number of Shares or Purchase Price Cannot be Empty");
      return;
    }

    if (isNaN(newStock.numShares) || isNaN(newStock.purchasePrice)) {
      alert("Number of Shares or Purchase Price Must Be A Number");
      return;
    }

    this.props.handleAdd(newStock);
  }

  render(){
    const { name, ticker, handleCancel } = this.props;

    return (
      <div>
          <h3>Add Stock to Portfolio</h3>
          <TextField
            hintText="Stock Name"
            defaultValue={name}
            disabled={true}
            ref="name"
          />
          <TextField
            hintText="Stock Ticker"
            defaultValue={ticker}
            disabled={true}
            ref="ticker"
          />
          <TextField
            hintText="Number of shares"
            ref="numShares"
          />
          <TextField
            hintText="Purchase Price"
            ref="purchasePrice"
          />
          <br />
          <RaisedButton
            label="Add"
            secondary={true}
            onClick={this.handleClickAddButton.bind(this)}
          />
          <RaisedButton
            label="Cancel"
            primary={true}
            onClick={() => handleCancel()}
          />
      </div>
    )
  }
}

export default StockInputForm;
