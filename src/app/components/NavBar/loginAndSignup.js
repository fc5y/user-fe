import React from 'react';
import { Link } from 'react-router-dom';

import styles from './loginAndSignup.scss';

function LoginAndSignup() {
  return (
    <ul className={styles.loginAndSignup}>
      <li>
        <Link to="/login" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.5)' }}>
          Đăng nhập
        </Link>
      </li>
      <li className={styles.regis}>
        <Link to="/signup" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.5)' }}>
          Tạo tài khoản
        </Link>
      </li>
    </ul>
  );
}

export default LoginAndSignup;
