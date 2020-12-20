import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import FieldSet from './FieldSet';
import { commonInputPropTypes } from '../types';

const Label = styled.label`
  display: block;
  font-size: 12px;
  line-height: 24px;
  color: var(--black60);
`;

const Input = styled.input`
  display: block;
  font-size: 16px;
  line-height: 25px;
  outline: none;
  border: none;
  padding: 0;
  width: 100%;
  padding: 2px 0;
  color: var(--black80);

  &:disabled {
    background-color: #fff;
    color: var(--black50);
    pointer-events: none;
  }

  ${({ hasError }) =>
    hasError
      ? css`
          border-bottom: 1px solid var(--form-text-error);

          &:focus {
            border-bottom-color: var(--form-text-error-focus);
          }
        `
      : css`
          border-bottom: 1px solid rgba(0, 0, 0, 0.24);

          &:focus {
            border-bottom-color: #1c83c6;
          }
        `}
`;

const Error = styled.div`
  font-size: 12px;
  line-height: 24px;
  color: var(--form-text-error);
  height: 25px;
`;

function LabeledInput({
  // commonInputPropTypes
  label,
  name,
  value,
  error,
  onChange,
  disabled,
  // own props
  type,
  onKeyEnter,
}) {
  const id = React.useMemo(Math.random, []);
  const handleChange = (event) => onChange && onChange(event.target.value);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      typeof onKeyEnter === 'function' && onKeyEnter(e);
    }
  };

  return (
    <FieldSet>
      <Label>{label}</Label>
      <Input
        id={id}
        name={name}
        value={value || ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        hasError={!!error}
        type={type}
        maxLength={255}
        disabled={disabled}
      />
      <Error>{error}</Error>
    </FieldSet>
  );
}

LabeledInput.propTypes = {
  ...commonInputPropTypes,
  type: PropTypes.string.isRequired,
};

export default LabeledInput;
