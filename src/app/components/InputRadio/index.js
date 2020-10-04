import React from 'react';
import PropTypes from 'prop-types';

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
  } = props;
  return (
    <div className={inputRadio}>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <ul className={option}>
        <li>
          <input
            id={id + op1}
            type="radio"
            name={name}
            defaultChecked
            onChange={onChange}
            value="0"
          />
          <label htmlFor={id + op1} className={inputContent}>
            {op1}
          </label>
        </li>
        <li>
          <input id={id + op2} type="radio" name={name} value="1" onChange={onChange} />
          <label htmlFor={id + op2} className={inputContent}>
            {op2}
          </label>
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
};

export default InputRadio;
