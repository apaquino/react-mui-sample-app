import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


class StockInputForm extends Component {

  handleClickAddButton(e) {
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
      numShares: numShares.getValue(),
      purchasePrice: purchasePrice.getValue(),
    };

    this.props.handleAdd(newStock);

  }

  handleClickCancelButton() {
      this.props.handleCancel();
  }

  render(){
    const { name, ticker } = this.props;

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
          onClick={this.handleClickCancelButton.bind(this)}
        />
      </div>
    )
  }
}

export default StockInputForm;
