import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './header.scss';
import LoginAndSignup from './LoginAndSignup';
import Username from './Username';

function Header({ username }) {
  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="../src/assets/images/logo.png" alt="logo" />
          </Link>
        </div>
        <div className={styles.menu}>
          <ul>
            <li>
              <Link to="/info" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.5)' }}>
                Thông tin
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.user}>{username === '' ? <LoginAndSignup /> : <Username />}</div>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Header;
