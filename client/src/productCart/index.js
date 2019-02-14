import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import styles from './styles.scss';
// general
import DropdownSelect from 'components/dropdownSelect';
import optionGenerator from 'utils/optionGenerator';
import ProtectionPlan from './components/protectionPlan';
import Location from './components/location';
import CheckoutButton from './components/checkoutButton';
import BuyNowButton from './components/buyNowButton';
import PrimeDetails from './components/primeDetails';

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
    axios.get('/api/6').then(({ data }) => {
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
              {!!this.state.product.primeEligible ? (
                <PrimeDetails />
              ) : (
                <>
                  <p>
                    <b>&amp; Free Shipping</b>.&nbsp;<a href="#">Details.</a>
                  </p>
                  <p>
                    <b>Want it tomorrow, Feb 13?</b>Order within 22hrs and 2mins
                    and chose <b>One-Day shipping</b> at checkout.{' '}
                    <a href="#">Details.</a>
                  </p>
                </>
              )}
              {this.state.product.numInStock > 20 ? (
                <h4 className={styles.inStock}>In Stock.</h4>
              ) : (
                'hello'
              )}
              <p>
                Ships from and sold by {this.state.product.owningCompany}.{' '}
                {!!this.state.product.giftWrapAvail
                  ? 'Gift-wrap available.'
                  : ''}
              </p>
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
              <BuyNowButton />
              <Location />
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
