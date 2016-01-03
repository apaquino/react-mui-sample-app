import React, { Component, PropTypes } from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import numeral from 'numeral';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';


const loss = {
  color: 'red'
};

const gain = {
  color: 'green'
};

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  numShares: PropTypes.number.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  originalTotalPrice: PropTypes.number.isRequired,
  currentTotalPrice: PropTypes.number.isRequired,
  handleRemove: PropTypes.func,
};

class StockTableRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }
  handleRemoveButtonClick(id) {
    this.props.handleRemove(id);
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  }

  render() {
    const {
      id,
      name,
      ticker,
      numShares,
      purchasePrice,
      originalTotalPrice,
      currentTotalPrice,
    } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)} />,
      <FlatButton
        label="Submit"
        secondary={true}
        onTouchTap={this.handleRemoveButtonClick.bind(this, id)} />,
    ];

    return (
      <TableRow>
          <TableRowColumn colSpan="2">{name}</TableRowColumn>
          <TableRowColumn>{ticker}</TableRowColumn>
          <TableRowColumn>{numShares}</TableRowColumn>
          <TableRowColumn>{numeral(purchasePrice).format('$0,0.00')}</TableRowColumn>
          <TableRowColumn>{numeral(originalTotalPrice).format('$0,0.00')}</TableRowColumn>
          <TableRowColumn>{numeral(currentTotalPrice).format('$0,0.00')}</TableRowColumn>
          <TableRowColumn style={(currentTotalPrice - originalTotalPrice) < 0 ? loss : gain}>{numeral(currentTotalPrice - originalTotalPrice).format('$0,0.00')}</TableRowColumn>
          <TableRowColumn>
            <FlatButton
              label="Remove"
              primary={true}
              onClick={this.handleOpen.bind(this)}
            />
            <Dialog
              title="Are you sure you want to delete this stock from your portfolio?"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              {`Are are about to remove ${name} - ${ticker} stock. Press submit to complete transaction`}
            </Dialog>
          </TableRowColumn>
      </TableRow>
    )
  }
}

StockTableRow.propTypes = propTypes;

export default StockTableRow;
