import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  flex: 1 1 0;
  margin-left: 6px;

  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  width: auto;
  height: 100%;
  padding-left: 12px;
  padding-right: 12px;
  margin-right: 12px;

  color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;

  :visited {
    color: rgba(0, 0, 0, 0.5);
  }

  :hover {
    color: rgba(0, 0, 0, 0.75);
    background-color: rgba(0, 0, 0, 0.06);
  }

  :active {
    color: rgba(0, 0, 0, 0.75);
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

export default function Left() {
  return (
    <Container>
      <StyledLink to="/contests">Các kỳ thi</StyledLink>
      <StyledLink to="/ranking">Bảng xếp hạng</StyledLink>
      <StyledLink to="/help">Hướng dẫn</StyledLink>
    </Container>
  );
}
