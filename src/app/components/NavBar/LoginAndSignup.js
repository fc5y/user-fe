import React from 'react';
import { Link } from 'react-router-dom';

import styles from './loginAndSignup.scss';

function LoginAndSignup() {
  return (
    <div className={styles.loginAndSignup}>
      <Link to="/auth/login" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.5)' }}>
        Đăng nhập
      </Link>
      <Link
        to="/signup"
        className={styles.regis}
        style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.5)' }}
      >
        Tạo tài khoản
      </Link>
    </div>
  );
}

export default LoginAndSignup;
