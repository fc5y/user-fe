import React from 'react';
import { Link } from 'react-router-dom';

import styles from './btnGoBack.scss';

function Content() {
  return (
    <Link to="/" className={styles.aBtn}>
      <div className={styles.goBackBtn}>Về trang chủ</div>
    </Link>
  );
}

export default Content;
