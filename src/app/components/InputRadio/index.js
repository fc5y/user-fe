import React from 'react';
import PropTypes from 'prop-types';
import styles from './radio.scss';

function InputRadio(props) {
  const {
    inputRadio,
    label,
    labelStyle,
    option,
    id,
    inputContent,
    name,
    onChange,
    op1,
    op2,
    isFirstOption,
  } = props;
  return (
    <div className={inputRadio}>
      <label className={labelStyle} htmlFor={id}>
        {label}
      </label>
      <ul className={option}>
        <li>
          <div
            id={id}
            name={name}
            aria-label="choose-option"
            role="button"
            className={isFirstOption ? styles.checked : styles.unchecked}
            onClick={onChange}
            onKeyDown={onChange}
            tabIndex="0"
            value="0"
          />
          <span className={inputContent}>{op1}</span>
        </li>
        <li>
          <div
            id={id}
            aria-label="choose-option"
            role="button"
            className={!isFirstOption ? styles.checked : styles.unchecked}
            onClick={onChange}
            onKeyDown={onChange}
            tabIndex="0"
            value="1"
          />
          <span className={inputContent}>{op2}</span>
        </li>
      </ul>
    </div>
  );
}

InputRadio.propTypes = {
  inputRadio: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.string,
  op1: PropTypes.string,
  op2: PropTypes.string,
  id: PropTypes.string,
  option: PropTypes.string,
  inputContent: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  isFirstOption: PropTypes.bool,
};

InputRadio.defaultProps = {
  inputRadio: '',
  label: '',
  id: '',
  option: '',
  inputContent: '',
  onChange: null,
  name: '',
  labelStyle: '',
  op1: '',
  op2: '',
  isFirstOption: true,
};

export default InputRadio;
