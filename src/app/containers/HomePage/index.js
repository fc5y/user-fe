import * as React from 'react';
import { Helmet } from 'react-helmet';

// Hook
import useFetchContestInfo from 'src/shared/hook/useFetchContestsInfo';

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
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 0 10px;
`;

const BannerImageWrapper = styled.div`
  margin: 20px 0;
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  width: 100%;
  height: 100%;
  max-height: 90px;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
`;

function HomePage() {
  const [isAddingNewRows, setIsAddingNewRows] = React.useState(false);
  const { apiState, onGoingContests, endedContests } = useFetchContestInfo({
    limit: 10,
    offset: 0,
    forceFetch: isAddingNewRows,
    onFetchCompleted: () => setIsAddingNewRows(false),
  });

  return (
    <>
      <Container>
        <Helmet>
          <title>Free Contest</title>
        </Helmet>
        <OngoingContest
          isLoading={apiState.progress === API_PROGRESS.REQ && onGoingContests.length === 0}
          contests={onGoingContests}
        />
        <BannerImageWrapper>
          <LazyImage src={bannerImage} alt="homepage-banner" />
        </BannerImageWrapper>
        <WelcomeBanner />
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
