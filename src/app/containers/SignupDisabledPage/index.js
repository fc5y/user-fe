import React from 'react';

import ButtonGoBack from '../../components/Button/BtnGoBack';
import styles from './style.scss';

function SignupDisabledPage() {
  return (
    <div className={styles.content}>
      <span className={styles.text}>Đã hết thời hạn đăng ký.</span>
      <ButtonGoBack />
    </div>
  );
}

export default SignupDisabledPage;
