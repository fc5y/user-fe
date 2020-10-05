import * as React from 'react';
import cx from 'classnames';
import styles from './style.scss';
import PropTypes from 'prop-types';

function Container({ children }) {
  return <div className={cx(styles.container)}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
};

function Title({ children }) {
  return <div className={styles.title}>{children}</div>;
}

Title.propTypes = {
  children: PropTypes.node,
};

function Description({ children }) {
  return <div className={styles.description}>{children}</div>;
}

Description.propTypes = {
  children: PropTypes.node,
};

export { Container, Title, Description };
