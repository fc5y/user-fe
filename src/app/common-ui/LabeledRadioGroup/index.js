import * as React from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';

// TODO: customize radio button image
function LabeledRadioGroup({ label, name, value, options, error, onChange }) {
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
      {options.map((option, index) => {
        return (
          <div className={styles.option} key={option.value}>
            <input
              className={styles.radioButton}
              type="radio"
              id={`${id}:${index}`}
              name={name}
              value={option.value}
              onChange={handleChange}
              checked={option.value === value}
            />
            <label className={styles.radioLabel} htmlFor={`${id}:${index}`}>
              {option.label}
            </label>
          </div>
        );
      })}
      <div className={styles.error}>{error}</div>
    </div>
  );
}

LabeledRadioGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default LabeledRadioGroup;
