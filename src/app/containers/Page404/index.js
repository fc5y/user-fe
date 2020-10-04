import React from 'react';

import ButtonGoBack from '../../components/Button/BtnGoBack';
import styles from './style.scss';

function Page404() {
  return (
    <div className={styles.content}>
      <p className={styles.title}>404</p>
      <span className={styles.text}>Trang bạn yêu cầu hiện không thể tìm thấy</span>
      <ButtonGoBack />
    </div>
  );
}

export default Page404;
