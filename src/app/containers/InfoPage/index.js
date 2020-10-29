import React from 'react';
import Markdown from 'react-markdown';
import { Helmet } from 'react-helmet';

import styles from './style.scss';
import md from './Info.md';

function InfoPage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      <div className={styles.content}>
        <p className={styles.title}>Quy chế của kỳ thi</p>
        <span className={styles.text}>
          <Markdown source={md} escapeHtml={false} />
        </span>
      </div>
    </div>
  );
}

export default InfoPage;
