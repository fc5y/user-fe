import * as React from 'react';

// Components
import WarningBox from 'src/app/common-ui/WarningBox';

// Utils
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

export default function RankingPage() {
  return (
    <Container>
      <Helmet>
        <title>Bảng xếp hạng</title>
      </Helmet>
      <WarningBox content="Tính năng này đang được xây dựng" />
    </Container>
  );
}
