import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles';

class Tooltip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, onClose, open, myRef } = this.props;
    return open
      ? createPortal(
          <div className={styles.tooltip}>
            <div className={styles.tooltip__close} onClick={onClose}>
              &times;
            </div>
            {children}
          </div>,
          myRef.current
        )
      : null;
  }
}

export default Tooltip;
