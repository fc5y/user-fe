import React from 'react';
import PropTypes from 'prop-types';

function InputText(props) {
  const { label, divStyle, labelStyle, inputStyle, type, id, name, value, onChange } = props;
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={id}>
        {label}
      </label>
      <input
        className={inputStyle}
        type={type}
        name={name}
        value={value}
        id={id}
        onChange={onChange}
      />
    </div>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  divStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
};

InputText.defaultProps = {
  label: '',
  type: '',
  id: '',
  name: '',
  value: '',
  onChange: null,
  divStyle: '',
  labelStyle: '',
  inputStyle: '',
};

export default InputText;
