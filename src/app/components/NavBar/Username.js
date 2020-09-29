import React from 'react';
import vectorLogo from '../../../assets/images/vector.png';
import styles from './username.scss';

const username = JSON.parse(localStorage.getItem('username'));

function Username() {
  return (
    <div className={styles.username}>
      <div>{username}</div>
      <div className={styles.toggle}>
        <img src={vectorLogo} alt="toggle" />
      </div>
    </div>
  );
}

export default Username;
