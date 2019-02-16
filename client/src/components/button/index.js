import React from 'react';
import styles from './styles';

const Button = ({ children, className }) => (
  <button className={`${styles.button} ${className}`}>{children}</button>
);

export default Button;
