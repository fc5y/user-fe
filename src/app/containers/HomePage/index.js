import * as React from 'react';
import { Helmet } from 'react-helmet';

// Common UI
import AlertWarning from 'src/app/common-ui/AlertWarning';

// Hook
import useFetchContestInfo from 'src/shared/hook/useFetchContestsInfo';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Components
import OngoingContest from 'src/app/components/ContestsOngoing';
import EndedContests from 'src/app/components/ContestsEnded';
import LazyImage from 'src/app/components/LazyImage';
import WelcomeBanner from './components/WelcomeBanner';
import Footer from 'src/app/components/Footer';

// Utils and constants
import styled from 'styled-components';
import { API_PROGRESS } from 'src/shared/constants';

// Assets
import bannerImage from 'assets/images/home_banner.png';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 10px;
  min-height: calc(100vh - var(--navbar-height) - var(--footer-height));
`;

const AlertContainer = styled.div`
  max-width: var(--max-content-width);
  min-width: var(--min-content-width);
  width: 100%;
  margin-bottom: 30px;
`;

const AlertContent = styled.p`
  line-height: 24px;
`;

const BannerImageWrapper = styled.div`
  margin: 20px 0;
  max-width: var(--max-content-width);
  min-width: var(--min-content-width);
  width: 100%;
  height: 100%;
  max-height: 90px;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
`;

function HomePage() {
  const { userInfo } = React.useContext(UserInfoContext);
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
        <AlertContainer>
          <AlertWarning
            content={<AlertContent>Tôi đã tìm thấy warning box và đây là content mới</AlertContent>}
          />
        </AlertContainer>
        <OngoingContest
          isLoading={apiState.progress === API_PROGRESS.REQ && onGoingContests.length === 0}
          contests={onGoingContests}
        />
        <BannerImageWrapper>
          <LazyImage src={bannerImage} alt="homepage-banner" />
        </BannerImageWrapper>
        {userInfo.isFetched && !userInfo.username && <WelcomeBanner />}
        <EndedContests
          isLoading={apiState.progress === API_PROGRESS.REQ && endedContests.length === 0}
          contests={endedContests}
        />
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
