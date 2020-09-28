import React from 'react';
import { Link } from 'react-router-dom';

import styles from './btnJoin.scss';

function Content() {
  return (
    <Link to="/enter">
      <div className={styles.joinBtn}>Vào thi</div>
    </Link>
  );
}

export default Content;
