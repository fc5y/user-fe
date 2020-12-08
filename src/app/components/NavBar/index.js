import * as React from 'react';
import styled from 'styled-components';
import { UserInfoContext } from 'src/shared/context/UserInfo';

import Logo from './Logo';
import Left from './Left';
import Right from './Right';

const Container = styled.div`
  position: sticky;
  height: 50px;
  width: 100%;

  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.125);

  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;

  display: flex;
`;

export default function NavBar() {
  const { userInfo } = React.useContext(UserInfoContext);

  return (
    <Container>
      <Content>
        <Logo />
        <Left />
        <Right username={userInfo.username} />
      </Content>
    </Container>
  );
}
