import React from 'react';
// import { Link } from 'react-router-dom';

import styles from './content.scss';

function Content() {
  return (
    <div className={styles.content}>
      <p className={styles.title}>Thông tin về kỳ thi FYT Code Cup</p>
      <span className={styles.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </span>
    </div>
  );
}

export default Content;
