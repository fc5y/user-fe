import React from 'react';
import Markdown from 'react-markdown';

import styles from './style.scss';
import md from './Info.md';

function InfoRulesPage() {
  return (
    <div className={styles.content}>
      <p className={styles.title}>Quy chế thi</p>
      <span className={styles.text}>
        <Markdown source={md} />
      </span>
    </div>
  );
}

export default InfoRulesPage;
