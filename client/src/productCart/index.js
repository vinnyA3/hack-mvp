import React, { Component } from 'react';
import axios from 'axios';
import styles from './styles.scss';

class Cart extends Component {
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
      <div className={styles.container}>
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

export default Cart;
