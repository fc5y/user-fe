import React from 'react';
import Markdown from 'react-markdown';
import { Helmet } from 'react-helmet';

import styles from './style.scss';
import md from './content.md';

function CmsHelpPage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Hướng dẫn tham gia Free Contest</title>
      </Helmet>
      <div className={styles.content}>
        <p className={styles.title}>Hướng dẫn tham gia Free Contest</p>
        <div className={styles.text}>
          <Markdown source={md} escapeHtml={false} />
        </div>
      </div>
    </div>
  );
}

export default CmsHelpPage;
