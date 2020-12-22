import * as React from 'react';
import { Helmet } from 'react-helmet';

// Hook
import useFetchContestInfo from 'src/shared/hook/useFetchContestsInfo';

// Components
import OngoingContest from 'src/app/components/ContestsOngoing';
import EndedContests from 'src/app/components/ContestsEnded';
import LazyImage from 'src/app/components/LazyImage';
import { SecondaryButton } from 'src/app/common-ui/Button';
import IconClose from 'src/app/common-ui/Icons/IconClose';

// Utils and constants
import styled from 'styled-components';
import { API_PROGRESS } from 'src/shared/constants';

// Assets
import bannerImage from 'assets/images/home_banner.png';
import welcomeImage from 'assets/images/home_welcome.png';

import styles from './style.scss';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
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

const WelcomeWrapper = styled.div`
  position: relative;
  margin: 20px 0;
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  width: 100%;
  min-height: 150px;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  background: radial-gradient(50% 100% at 100% 0%, #ffc070 0%, rgba(255, 255, 255, 0) 100%),
    radial-gradient(50% 100% at 0% 0%, #67adda 0%, rgba(255, 255, 255, 0) 100%);
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 100%;
  height: 100%;

  width: 20px;
  height: 20px;
  z-index: 10;
  cursor: pointer;
`;

const WelcomeInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WelcomeTitle = styled.div`
  font-weight: 600;
  color: var(--black80);
  margin-bottom: 20px;
`;

const WelcomeText = styled.div`
  color: var(--black80);
  margin: 5px 0;
`;

const Button = styled(SecondaryButton)`
  margin-top: 15px;
`;

function HomePage() {
  const [isAddingNewRows, setIsAddingNewRows] = React.useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = React.useState(true);
  const { apiState, onGoingContests, endedContests } = useFetchContestInfo({
    limit: 10,
    offset: 0,
    forceFetch: isAddingNewRows,
    onFetchCompleted: () => setIsAddingNewRows(false),
  });

  return (
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
      {showWelcomeBanner && (
        <WelcomeWrapper>
          <LazyImage
            src={welcomeImage}
            alt="homepage-welcome"
            imageClassName={styles.welcomeImage}
          />
          <IconWrapper onClick={() => setShowWelcomeBanner(false)}>
            <IconClose />
          </IconWrapper>
          <WelcomeInfo>
            <WelcomeTitle>Đăng ký tham gia Free Contest thôi!</WelcomeTitle>
            <WelcomeText>
              Đăng ký ngay để được tham gia các kỳ thi hấp dẫn của Free Contest. Nâng cao kỹ năng
              lập trình thi đấu.
            </WelcomeText>
            <WelcomeText>
              Chuẩn bị cho các kỳ thi quan trọng như kỳ thi HSG QG môn Tin học, APIO, IOI, ACM-ICPC.
            </WelcomeText>
            <Button>Tạo tài khoản</Button>
          </WelcomeInfo>
        </WelcomeWrapper>
      )}
      <EndedContests
        isLoading={apiState.progress === API_PROGRESS.REQ && endedContests.length === 0}
        contests={endedContests}
      />
    </Container>
  );
}

export default HomePage;
