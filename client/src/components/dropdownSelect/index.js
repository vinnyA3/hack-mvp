import React from 'react';
import styles from './styles.scss';

const dropdownSelect = ({ type = 'Qty', children }) => {
  return (
    <>
      <label htmlFor="">{type}:</label>&nbsp;
      <select>{children}</select>
    </>
  );
};

export default dropdownSelect;
