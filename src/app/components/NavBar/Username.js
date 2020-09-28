import React from 'react';
// import { Link } from 'react-router-dom';

import styles from './username.scss';

const username = JSON.parse(localStorage.getItem('username'));

function Username() {
  return (
    <ul className={styles.username}>
      <li>{username}</li>
      <li className={styles.toggle}>
        <img src="../src/assets/images/Vector.png" alt="toggle" />
      </li>
    </ul>
  );
}

export default Username;
