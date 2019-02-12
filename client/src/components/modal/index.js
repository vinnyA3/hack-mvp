import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles';

const Modal = ({ children, onClose, open }) =>
  open
    ? createPortal(
        <div className={styles.modal}>
          <div className={styles.modal__close} onClick={onClose}>
            &times;
          </div>
          {children}
        </div>,
        document.body
      )
    : null;

export default Modal;
