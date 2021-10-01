import * as React from 'react';
import { Helmet } from 'react-helmet';

// Hook
import useFetchContestInfo from 'src/shared/hook/useFetchContestsInfo';
import { useHistory } from 'react-router-dom';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Components
import OngoingContest from 'src/app/components/ContestsOngoing';
import EndedContests from 'src/app/components/ContestsEnded';
import WelcomeBanner from './components/WelcomeBanner';
import Footer from 'src/app/components/Footer';

// common-ui
import InfoAnnouncement from 'src/app/common-ui/InfoAnnouncement';

// Utils and constants
import styled from 'styled-components';
import { API_PROGRESS } from 'src/shared/constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 10px;
  min-height: calc(100vh - var(--navbar-height) - var(--footer-height));
`;

const ContestTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-default);
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  padding: 24px;
  background: #fff;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  border-radius: 4px;
`;
function HomePage() {
  const { userInfo } = React.useContext(UserInfoContext);
  const history = useHistory();
  const { apiState, onGoingContests, endedContests } = useFetchContestInfo({
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Container>
        <Helmet>
          <title>Free Contest</title>
        </Helmet>
        <InfoAnnouncement content="Chào bạn! Đây là một thông báo mới vui lòng để ý giùm mình nha." />
        <Wrapper>
          <OngoingContest
            isLoading={apiState.progress === API_PROGRESS.REQ && onGoingContests.length === 0}
            contests={onGoingContests}
          />
          <EndedContests
            isLoading={apiState.progress === API_PROGRESS.REQ && endedContests.length === 0}
            contests={endedContests}
          />
          <ButtonWrapper>
            <ContestTitle onClick={() => history.push('/contests')}>
              Xem thêm các kỳ thi khác
            </ContestTitle>
          </ButtonWrapper>
        </Wrapper>
        {userInfo.isFetched && !userInfo.username && <WelcomeBanner />}
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
