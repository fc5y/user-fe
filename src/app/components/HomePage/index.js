import React from 'react';
// import { Link } from 'react-router-dom';

import Header from '../NavBar/header';
import Content from './content';

import styles from './style.scss';

// To check if users have logined or not. Waiting for Item name.
let username = JSON.parse(localStorage.getItem('username'));
// To set username:
// localStorage.setItem('username', JSON.stringify(username_value));
if (username === null) username = '';

// Set joinDisabled to 'true' to block users.
const joinDisabled = 'true';

function HomePage() {
  return (
    <div className={styles.container}>
      <Header uname={username} />
      <Content uname={username} disabled={joinDisabled} />
    </div>
  );
}

export default HomePage;
