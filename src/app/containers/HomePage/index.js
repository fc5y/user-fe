import React from 'react';
import { Helmet } from 'react-helmet';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 48px 0;
`;

function HomePage() {
  const { userInfo } = React.useContext(UserInfoContext);
  const { contestInfo } = React.useContext(ContestInfoContext);

  return (
    <Container>
      <Helmet>
        <title>Freecontest</title>
      </Helmet>
    </Container>
  );
}

export default HomePage;
