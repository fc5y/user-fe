import * as React from 'react';
import { Helmet } from 'react-helmet';
import cx from 'classnames';
import styles from './style.scss';

// Common UI
import AlertWarning from 'src/app/common-ui/AlertWarning';

// Hook
import useFetchContestInfo from 'src/shared/hook/useFetchContestsInfo';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Components
import OngoingContest from 'src/app/components/ContestsOngoing';
import EndedContests from 'src/app/components/ContestsEnded';
import WelcomeBanner from './components/WelcomeBanner';
import Footer from 'src/app/components/Footer';

// Utils and constants
import styled from 'styled-components';
import { API_PROGRESS } from 'src/shared/constants';

// Assets
import bannerImage from 'assets/images/home_banner.png';
import IconBanner from 'src/assets/images/bannerlogo.png';
import IconUsers from 'src/assets/images/icon-users.png';
import IconMedal from 'src/assets/images/icon-medal.png';
import IconFC5Y from 'src/assets/images/icon-fc.png';

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
            content={
              <AlertContent>
                Quá trình chuyển dữ liệu đã hoàn tất. Các thí sinh có thể đăng nhập bằng username và
                password của tài khoản cũ (trên trang freecontest.xyz). Nếu gặp bất cứ vấn đề gì,
                vui lòng liên hệ với fanpage của chúng tôi tại&nbsp;
                <a
                  href="https://www.facebook.com/kc97blf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  đây
                </a>
                .
              </AlertContent>
            }
          />
        </AlertContainer>
        <OngoingContest
          isLoading={apiState.progress === API_PROGRESS.REQ && onGoingContests.length === 0}
          contests={onGoingContests}
        />
        <BannerImageWrapper>
          <div className={cx(styles.container)}>
            <img className={cx(styles.image)} src={IconBanner} alt="homepage-banner" />
            <div className={cx(styles.container_child)}>
              <div className={cx(styles.container_child_logo)}>
                <img src={IconFC5Y} alt="icon-logoFC5Y"></img>
                <div className={cx(styles.container_child_cnt)}>
                  <p>
                    <b>5 năm</b>
                  </p>
                  <p>Tổ chức các kỳ thi</p>
                </div>
              </div>
              <div className={cx(styles.container_child_users)}>
                <img src={IconUsers} alt="icon-users"></img>
                <div className={cx(styles.container_child_cnt)}>
                  <p>
                    <b>3800+</b>
                  </p>
                  <p>Thành viên</p>
                </div>
              </div>
              <div className={cx(styles.container_child_medal)}>
                <img src={IconMedal} alt="icon-medal"></img>
                <div className={cx(styles.container_child_cnt)}>
                  <p>
                    <b>Nền tảng lập trình thi đấu</b>
                  </p>
                  <p>hàng đầu Việt Nam</p>
                </div>
              </div>
            </div>
          </div>
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
