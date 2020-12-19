import * as React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.scss';

export function Button({ className, children, disabled, ...otherProps }) {
  return (
    <button
      className={cx(styles.button, disabled && styles.disabled, className)}
      type="button"
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export function PrimaryButton({ className, children, ...otherProps }) {
  return (
    <Button
      className={cx(styles.button, styles.primaryButton, className)}
      type="button"
      {...otherProps}
    >
      {children}
    </Button>
  );
}

PrimaryButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export function SecondaryButton({ className, children, ...otherProps }) {
  return (
    <Button
      className={cx(styles.button, styles.secondaryButton, className)}
      type="button"
      {...otherProps}
    >
      {children}
    </Button>
  );
}

SecondaryButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
