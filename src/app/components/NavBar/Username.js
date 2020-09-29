import React from 'react';
import vectorLogo from '../../../assets/images/vector.png';
import styles from './username.scss';

const username = JSON.parse(localStorage.getItem('username'));

function Username() {
  return (
    <ul className={styles.username}>
      <li>{username}</li>
      <li className={styles.toggle}>
        <img src={vectorLogo} alt="toggle" />
      </li>
    </ul>
  );
}

export default Username;
