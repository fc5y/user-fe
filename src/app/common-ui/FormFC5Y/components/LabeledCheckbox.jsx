import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FieldSet from './FieldSet';
import { commonInputPropTypes } from '../types';

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  margin-left: 6px;
`;

const CheckboxContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
`;

const Error = styled.div`
  font-size: 12px;
  line-height: 24px;
  color: var(--form-text-error);
  height: 25px;
`;

function CheckedBox() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="2" fill="#1C83C6" />
      <path
        d="M8.29289 17.7929L3.70711 13.2071C3.31658 12.8166 3.31658 12.1834 3.70711 11.7929L4.29289 11.2071C4.68342 10.8166 5.31658 10.8166 5.70711 11.2071L8.29289 13.7929C8.68342 14.1834 9.31658 14.1834 9.70711 13.7929L17.7929 5.70711C18.1834 5.31658 18.8166 5.31658 19.2071 5.70711L19.7929 6.29289C20.1834 6.68342 20.1834 7.31658 19.7929 7.70711L9.70711 17.7929C9.31658 18.1834 8.68342 18.1834 8.29289 17.7929Z"
        fill="white"
        stroke="white"
      />
    </svg>
  );
}

function UncheckedBox() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="23" height="23" rx="1.5" fill="white" stroke="#1C83C6" />
    </svg>
  );
}

function LabeledCheckbox({
  // commonInputPropTypes
  label,
  name,
  value,
  error,
  onChange,
  // own props
  valueWhenChecked,
  valueWhenUnchecked,
}) {
  const id = React.useMemo(Math.random, []);
  const handleChange = (event) =>
    onChange && onChange(event.target.checked ? valueWhenChecked : valueWhenUnchecked);

  return (
    <FieldSet>
      <Input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={value === valueWhenChecked}
        onChange={handleChange}
      />
      <Label htmlFor={id}>
        <CheckboxContainer>
          {value === valueWhenChecked ? <CheckedBox /> : <UncheckedBox />}
        </CheckboxContainer>
        <Content>{label}</Content>
      </Label>
      <Error>{error}</Error>
    </FieldSet>
  );
}

LabeledCheckbox.propTypes = {
  ...commonInputPropTypes,
  valueWhenChecked: PropTypes.string.isRequired,
  valueWhenUnchecked: PropTypes.string.isRequired,
};

export default LabeledCheckbox;
