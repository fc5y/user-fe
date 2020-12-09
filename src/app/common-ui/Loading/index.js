import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';

function Loading() {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.loader} />
      </div>
    </div>,
    document.querySelector('body'),
  );
}

export default Loading;
