import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import styles from './styles.scss';
// general
import DropdownSelect from 'components/dropdownSelect';
import optionGenerator from 'utils/optionGenerator';
import ProtectionPlan from './components/protectionPlan';
import CheckoutButton from './components/checkoutButton';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      product: null,
      productReviews: null,
    };
  }

  componentDidMount() {
    axios.get('/api/23').then(({ data }) => {
      console.log(data.rows);
      this.setState({
        product: data.rows,
        productReviews: data.rRows,
      });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          {this.state.product ? (
            <>
              <h3 className={styles.price}>
                <span className={styles.currency}>&#36;</span>
                {this.state.product.originalPrice}
              </h3>
              {this.state.product.numInStock > 20 ? (
                <h3 className={styles.inStock}>In Stock.</h3>
              ) : (
                'hello'
              )}
              <DropdownSelect type="Qty" children={optionGenerator(30)} />
              {this.state.product.protectionPlan ? (
                <ProtectionPlan
                  protectionPlanPricingOptionOne={
                    this.state.product.protectionPlanPricingOptionOne
                  }
                  protectionPlanPricingOptionTwo={
                    this.state.product.protectionPlanPricingOptionTwo
                  }
                />
              ) : (
                ''
              )}
              <CheckoutButton />
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Cart;
