import React from 'react';
import styles from './styles.scss';
import Button from 'components/button';
import Modal from 'components/modal';

const ProtectionModal = ({
  showModal,
  toggleModal,
  product
}) => {
  const { productStars, productReviewCount, protectionPlanDesc } = product;
  return (
    <Modal open={showModal} onClose={toggleModal}>
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
  )
};

export default ProtectionModal;
