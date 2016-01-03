import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


class StockInputForm extends Component {

  onClickAddButton(e) {
    e.preventDefault();
    console.log(this.refs.name.getValue())
    console.log(this.refs.ticker.getValue())
    console.log(this.refs.numShares.getValue())
    console.log(this.refs.purchasePrice.getValue())
  }
  render(){
    const { name, ticker } = this.props;

    return (
      <div>
        <TextField
          defaultValue={name}
          disabled={true}
          ref="name"
        />
        <TextField
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
          onClick={this.onClickAddButton.bind(this)}
        />
        <RaisedButton
          label="Cancel"
          primary={true}
        />
      </div>
    )
  }
}

export default StockInputForm;
