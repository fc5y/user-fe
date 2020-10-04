import React from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';

import styles from './style.scss';
import md from './Info.md';

function InfoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Thông tin về kỳ thi FYT Code Cup</p>
        <span className={styles.text}>
          <Markdown source={md} escapeHtml={false} />
          <Link to="/info/rules">Quy chế thi</Link>
        </span>
      </div>
    </div>
  );
}

export default InfoPage;
