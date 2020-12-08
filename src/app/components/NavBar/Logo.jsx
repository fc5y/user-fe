import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logoImage from 'assets/images/logo.png';

const StyledLink = styled(Link)`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 36px;
  height: 36px;
`;

export default function Logo() {
  return (
    <StyledLink to="/">
      <Img src={logoImage} alt="logo" />
    </StyledLink>
  );
}
