import * as React from 'react';

// Utils
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// Components
import EnterScreen from './components/EnterScreen';

// Constants
import { ROUTE_LOGIN } from 'src/app/routes/constants';

const Container = styled.div`
  width: 600px;
  padding: 36px;
  margin: 48px auto;

  border-radius: 6px;

  background-color: white;
  filter: drop-shadow(0px 0px 12px rgba(188, 188, 188, 0.25));
  color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TitleLeft = styled.div`
  color: #076daf;
  font-size: 24px;
  font-weight: 600;
`;

const TitleRight = styled.div``;

function SignupPageFC5Y() {
  return (
    <Container>
      <Helmet>
        <title>Tạo tài khoản</title>
      </Helmet>
      <Title>
        <TitleLeft>Tạo tài khoản</TitleLeft>
        <TitleRight>
          <Link to={ROUTE_LOGIN}>Đăng nhập</Link>
        </TitleRight>
      </Title>
      <EnterScreen submit={(data) => alert(JSON.stringify(data, null, 2))} />
    </Container>
  );
}

export default SignupPageFC5Y;
