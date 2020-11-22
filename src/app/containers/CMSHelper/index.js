import React from 'react';
import Markdown from 'react-markdown';
import { Helmet } from 'react-helmet';

import styles from './style.scss';
import md from './Info.md';

function CMSHelper() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Hướng dẫn làm bài trên hệ thống CMS</title>
      </Helmet>
      <div className={styles.content}>
        <p className={styles.title}>Hướng dẫn làm bài trên hệ thống CMS</p>
        <div className={styles.text}>
          <Markdown source={md} escapeHtml={false} />
        </div>
      </div>
    </div>
  );
}

export default CMSHelper;
