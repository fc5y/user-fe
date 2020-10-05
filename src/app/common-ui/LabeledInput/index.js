import * as React from 'react';
import cx from 'classnames';
import styles from './style.scss';
import PropTypes from 'prop-types';

function LabeledInput({ label, name, value, type, error, onChange }) {
  const id = React.useMemo(Math.random, []);

  const handleChange = React.useCallback(
    (event) => {
      const element = event.target;
      onChange && onChange(element.name, element.value);
    },
    [onChange],
  );

  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={cx(styles.input, error ? styles.inputError : null)}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <div className={styles.error}>{error}</div>
    </div>
  );
}

LabeledInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default LabeledInput;
