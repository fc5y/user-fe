import React from 'react';
import { Link } from 'react-router-dom';

import styles from './btnLoginAndSignup.scss';

function BtnLoginAndSignup() {
  return (
    <div>
      <Link to="/signup">
        <div className={styles.regisBtn}>Tạo tài khoản</div>
      </Link>
      <Link to="/login">
        <div className={styles.loginBtn}>Đăng nhập</div>
      </Link>
    </div>
  );
}

export default BtnLoginAndSignup;
