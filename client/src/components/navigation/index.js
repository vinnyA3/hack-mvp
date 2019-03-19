import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

const Navigation = () => (
  <nav className={styles.navigation}>
    <div className={styles.brand}>
      <h1>
        <Link to="/">MVP</Link>
      </h1>
    </div>
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.item}>
        <a href="#">
          <i className="fab fa-github" />
          &nbsp; Github
        </a>
      </li>
    </ul>
  </nav>
);

export default Navigation;
