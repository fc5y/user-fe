import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './style.scss';

function InfoPage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      <div className={styles.content}>
        <p className={styles.title}>Hướng dẫn</p>
      </div>
    </div>
  );
}

export default InfoPage;
