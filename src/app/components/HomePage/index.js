import React from 'react';

import Header from '../NavBar/Header';
import Content from './Content';

// To check if users have logined or not. Waiting for Item name.
const username = JSON.parse(localStorage.getItem('username')) || '';
// To set username:
// localStorage.setItem('username', JSON.stringify(username_value));

// Set joinDisabled to 'true' to block users.
const joinDisabled = false;

function HomePage() {
  return (
    <div>
      <Header username={username} />
      <Content username={username} disabled={joinDisabled} />
    </div>
  );
}

export default HomePage;
