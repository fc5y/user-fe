import React from 'react';
import Markdown from 'react-markdown';

import styles from './content.scss';

import md from './Info.md';

function Content() {
  return (
    <div className={styles.content}>
      <p className={styles.title}>Quy chế thi</p>
      <span className={styles.text}>
        <Markdown source={md} escapeHtml={false} />
      </span>
    </div>
  );
}

export default Content;
