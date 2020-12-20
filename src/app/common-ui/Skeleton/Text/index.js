// Utils
import styled from 'styled-components';
import { blinkEffect } from '../shared';

export const Text = styled.div`
  min-height: 30px;
  background-color: #e1e4e8;
  border-radius: 10px;
  animation: ${blinkEffect} 1s infinite ease-in-out;
`;
