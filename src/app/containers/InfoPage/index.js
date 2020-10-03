import React from 'react';
import Markdown from 'react-markdown';

import styles from './style.scss';
import md from './Info.md';

function InfoPage() {
  return (
    <div className={styles.content}>
      <p className={styles.title}>Thông tin về kỳ thi FYT Code Cup</p>
      <span className={styles.text}>
        <Markdown source={md} />
      </span>
    </div>
  );
}

export default InfoPage;
