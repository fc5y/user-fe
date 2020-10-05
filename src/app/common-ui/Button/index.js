import * as React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.scss';

function Button({ className, children, ...otherProps }) {
  return (
    <button className={cx(styles.button, className)} type="button" {...otherProps}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function Primary({ className, children, ...otherProps }) {
  return (
    <button
      className={cx(styles.button, styles.primaryButton, className)}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
}

Primary.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Button, Primary };
