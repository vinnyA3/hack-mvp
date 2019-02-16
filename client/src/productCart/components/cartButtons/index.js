import React from 'react';
import Button from 'components/button';
import Icon from 'components/icon';
import styles from './styles';

const CartButtons = () => (
  <>
    <Button className={styles.cart}>
      <Icon className={styles.cart__icon} />
      <span>Add to Cart</span>
    </Button>
    <Button className={styles.buy}>
      <Icon className={styles.buy__icon} />
      <span>Buy Now</span>
    </Button>
  </>
);

export default CartButtons;
