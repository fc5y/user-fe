import React from 'react';
// import { Link } from 'react-router-dom';

import Header from '../NavBar/Header';
import Content from './Content';

import styles from './style.scss';

// To check if users have logined or not. Waiting for Item name.
const username = JSON.parse(localStorage.getItem('username')) || '';
// To set username:
// localStorage.setItem('username', JSON.stringify(username_value));

function HomePage() {
  return (
    <div className={styles.container}>
      <Header username={username} />
      <Content />
    </div>
  );
}

export default HomePage;
