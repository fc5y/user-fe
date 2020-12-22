import * as React from 'react';
import PropTypes from 'prop-types';

// Assets
import IconError from 'src/app/common-ui/Icons/IconError';

import styles from './style.scss';

export default function ErrorBox({ content }) {
  return (
    <div className={styles.container}>
      <IconError className={styles.icon} />
      <div className={styles.text}>{content}</div>
    </div>
  );
}

ErrorBox.propTypes = {
  content: PropTypes.string,
};
