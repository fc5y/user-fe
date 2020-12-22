import * as React from 'react';

// common ui
import * as MainPanel from '../../common-ui/MainPanel';

// Utils
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

// images
import iconWarning from 'assets/images/warning.svg';

const Accouncement = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const AccouncementIcon = styled.div`
  width: auto;
  margin-bottom: 18px;
`;

const AccouncementContent = styled.div``;

export default function RankingPage() {
  return (
    <MainPanel.Container>
      <Helmet>
        <title>Bảng xếp hạng</title>
      </Helmet>
      <Accouncement>
        <AccouncementIcon>
          <img src={iconWarning} alt="" />
        </AccouncementIcon>
        <AccouncementContent>Tính năng này đang được xây dựng</AccouncementContent>
      </Accouncement>
    </MainPanel.Container>
  );
}
