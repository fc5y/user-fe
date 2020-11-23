import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';

import Spinner from 'assets/images/spinner.gif';

function Loading() {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <img className={styles.spinner} src={Spinner} alt="loading..." />
      </div>
    </div>,
    document.querySelector('body'),
  );
}

export default Loading;
