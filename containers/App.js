import React, {Component} from 'react';
import AppBar from 'material-ui/lib/app-bar';
import StockInputSelector from '../components/StockInputSelector';
import stockDB from '../data/mockStockDB';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockDB
    };
  }
  render() {
    return (
      <div>
        <AppBar
          title="React Material-UI Stock App Example"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      <StockInputSelector />
      </div>
    )
  }
}

export default App;
