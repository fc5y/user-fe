import React from 'react';

import ButtonGoBack from '../Button/BtnGoBack';

import styles from './content.scss';

function Content() {
  return (
    <div className={styles.content}>
      <p className={styles.title}>404</p>
      <span className={styles.text}>Trang bạn yêu cầu hiện không thể tìm thấy</span>
      <ButtonGoBack />
    </div>
  );
}

export default Content;
