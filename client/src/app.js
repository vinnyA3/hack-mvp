import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import styles from './styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      productReviews: null,
    };
  }

  componentDidMount() {
    axios.get('/api/23').then(({ data }) => {
      this.setState({
        product: data.rows,
        productReviews: data.rRows,
      });
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <h1>Hello Hack Reactor!!</h1>
        <div>
          {this.state.product
            ? `${JSON.stringify(this.state.product, null, 2)} ${JSON.stringify(
                this.state.productReviews,
                null,
                2
              )}`
            : ''}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
