import React from 'react';
import { Link } from 'react-router-dom';

import styles from './style.scss';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <h4>Hello World</h4>
      <Link to="/about">Go to AboutPage</Link>
    </div>
  );
}

export default HomePage;
