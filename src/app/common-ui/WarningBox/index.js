import * as React from 'react';
import PropTypes from 'prop-types';

// Assets
import IconWarning from 'src/app/common-ui/Icons/IconWarning';

import styles from './style.scss';

export default function WarningBox({ content }) {
  return (
    <div className={styles.container}>
      <IconWarning className={styles.icon} />
      <div className={styles.text}>{content}</div>
    </div>
  );
}

WarningBox.propTypes = {
  content: PropTypes.string,
};
