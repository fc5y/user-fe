import React from 'react';
import Markdown from 'react-markdown';

import styles from './content.scss';

import md from './Info.md';

const escape = false;

function Content() {
  return (
    <div className={styles.content}>
      <p className={styles.title}>Thông tin về kỳ thi FYT Code Cup</p>
      <span className={styles.text}>
        <Markdown source={md} escapeHtml={escape} />
      </span>
    </div>
  );
}

export default Content;
