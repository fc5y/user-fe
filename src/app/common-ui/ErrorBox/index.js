import * as React from 'react';
import PropTypes from 'prop-types';

// Assets
import iconError from 'assets/images/error.svg';

import styles from './style.scss';

export default function ErrorBox({ content }) {
  return (
    <div className={styles.container}>
      <img className={styles.icon} src={iconError} alt="error" />
      <div className={styles.text}>{content}</div>
    </div>
  );
}

ErrorBox.propTypes = {
  content: PropTypes.string,
};
