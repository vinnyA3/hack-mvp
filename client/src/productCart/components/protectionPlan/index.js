import React, { Component } from 'react';
import styles from './styles.scss';
import Modal from 'components/modal';

class ProtectionPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

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
            <h4>Amazon Product</h4>
            <p>
              Amet dicta quidem nesciunt inventore cumque id In et cumque nam
              reiciendis libero sed. Aliquid repellendus aspernatur rerum
              accusamus quaerat ab facilis Atque nesciunt iste nisi numquam iste
              vitae Illum.
            </p>
          </div>
        </Modal>
      </>
    );
  }
}

export default ProtectionPlan;
