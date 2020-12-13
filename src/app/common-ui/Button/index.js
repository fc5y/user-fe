import * as React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.scss';

export function Button({ className, children, ...otherProps }) {
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

export function PrimaryButton({ className, children, ...otherProps }) {
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

PrimaryButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export function SecondaryButton({ className, children, ...otherProps }) {
  return (
    <button
      className={cx(styles.button, styles.secondaryButton, className)}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
}

SecondaryButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
