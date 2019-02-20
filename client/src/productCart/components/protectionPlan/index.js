import React, { Component } from 'react';
import styles from './styles.scss';
import Button from 'components/button';
import Modal from 'components/modal';

/// hooks
// useEffect(() => {
// })

class ProtectionPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    // this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  // updateCheckbox() {
  //   const target = e.target
  //   const value = target.type === 'checkbox' ? target.checked : target.value
  //   const name = target.name
  //   this.setState(prevState => ({ checked: !prevState.checked }));
  // }

  render() {
    const {
      protectionPlanPricingOptionOne,
      protectionPlanPricingOptionTwo,
      protectionPlanDesc,
      product,
      productReviewCount,
      productStars,
    } = this.props;

    return (
      <>
        <h4>Add a Protection Plan:</h4>
        <form>
          <input
            id="protection-first"
            type="checkbox"
            name="protection"
            checked
          />
          <label htmlFor="protection-first">
            <a href="#" onClick={this.toggleModal}>
              4-Year Protection
            </a>{' '}
            for{' '}
            <span className={styles.protectionPrice}>
              <span>&#36;</span>
              {protectionPlanPricingOptionOne}
            </span>
          </label>
          <br />
          <input id="protection-second" type="checkbox" name="protection" />
          <label htmlFor="protection-second">
            <a href="#" onClick={this.toggleModal}>
              3-Year Protection
            </a>{' '}
            for{' '}
            <span className={styles.protectionPrice}>
              <span>&#36;</span>
              {protectionPlanPricingOptionTwo}
            </span>
          </label>
        </form>
        <Modal open={this.state.showModal} onClose={this.toggleModal}>
          <div className={styles.protection__description}>
            <div className={styles.protection__title}>
              <h4>Add to your order</h4>
            </div>
            <div className={styles.protection__left}>
              <h3>{product}</h3>
              <div>{`${productStars} (${productReviewCount})`}</div>
              <p>{protectionPlanDesc}</p>
            </div>
            <div className={styles.protection__right}>
              <div className={styles.protection__buttons}>
                <Button>
                  <span>Add plan</span>
                </Button>
                <Button>
                  <span>No thanks</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ProtectionPlan;
