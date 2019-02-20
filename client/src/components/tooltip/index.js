import React from 'react';
import { createPortal } from 'react-dom';
import styles from './styles';

const Tooltip = ({ children, onClose, open, myRef }) =>
  open
    ? createPortal(
        <div className={styles.tooltip}>
          <div className={styles.tooltip__close} onClick={onClose}>
            &times;
          </div>
          <div className={styles.tooltip__arrow} />
          {children}
        </div>,
        myRef.current
      )
    : null;

export default Tooltip;
