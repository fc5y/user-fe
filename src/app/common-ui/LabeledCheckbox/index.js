import * as React from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';

// TODO: customize checkbox image

function LabeledCheckbox({ label, name, value, option, error, onChange }) {
  const id = React.useMemo(Math.random, []);

  const handleChange = React.useCallback(
    (event) => {
      const element = event.target;
      onChange && onChange(element.name, element.checked ? option : '');
    },
    [onChange],
  );

  return (
    <div>
      <div className={styles.option}>
        <input
          className={styles.checkButton}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={value === option}
          onChange={handleChange}
        />
        <label className={styles.checkLabel} htmlFor={id}>
          {label}
        </label>
      </div>
      <div className={styles.error}>{error}</div>
    </div>
  );
}

LabeledCheckbox.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.string,
  option: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default LabeledCheckbox;
