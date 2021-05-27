/* eslint-disable no-prototype-builtins */
import * as React from 'react';

// Hook
import { useHistory } from 'react-router-dom';

// Utils
import styled from 'styled-components';

// Components
import { SecondaryButton } from 'src/app/common-ui/Button';
import IconClose from 'src/app/common-ui/Icons/IconClose';
import LazyImage from 'src/app/components/LazyImage';

// Constants
import { ROUTE_SIGNUP } from 'src/app/routes/constants';
import { WELCOME_BANNER_SESSION_KEY } from 'src/shared/constants';

// Assets
import welcomeImage from 'assets/images/home_welcome.png';

import styles from './style.scss';

const WelcomeWrapper = styled.div`
  position: relative;
  margin: 20px 0;
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  width: 100%;
  height: 180px;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  background: radial-gradient(50% 100% at 100% 0%, #ffc070 0%, rgba(255, 255, 255, 0) 100%),
    radial-gradient(50% 100% at 0% 0%, #67adda 0%, rgba(255, 255, 255, 0) 100%);
`;

const WelcomeImage = styled(LazyImage)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
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

  @media (max-width: 800px) {
    top: 10px;
  }
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
  text-align: center;

  @media (max-width: 800px) {
    margin: 2px 0;
  }
`;

const Button = styled(SecondaryButton)`
  margin-top: 15px;
`;

const EXPIRED_TIME = 1 * 60 * 1000;

function WelcomeBanner() {
  const [showWelcomeBanner, setShowWelcomeBanner] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    try {
      const welcomeBannerStorage = JSON.parse(localStorage.getItem(WELCOME_BANNER_SESSION_KEY));

      if (
        welcomeBannerStorage &&
        typeof welcomeBannerStorage === 'object' &&
        welcomeBannerStorage.hasOwnProperty('show')
      ) {
        if (welcomeBannerStorage.show) {
          setShowWelcomeBanner(true);
        } else if (
          welcomeBannerStorage.hasOwnProperty('createdAt') &&
          Date.now() >= +welcomeBannerStorage.createdAt + EXPIRED_TIME
        ) {
          setShowWelcomeBanner(true);
          localStorage.setItem(
            WELCOME_BANNER_SESSION_KEY,
            JSON.stringify({
              show: true,
              createdAt: Date.now(),
            }),
          );
        } else if (
          welcomeBannerStorage.hasOwnProperty('createdAt') &&
          Date.now() < +welcomeBannerStorage.createdAt + EXPIRED_TIME
        ) {
          setShowWelcomeBanner(false);
        } else {
          setShowWelcomeBanner(true);
          localStorage.setItem(
            WELCOME_BANNER_SESSION_KEY,
            JSON.stringify({
              show: true,
              createdAt: Date.now(),
            }),
          );
        }
      } else {
        setShowWelcomeBanner(true);
        localStorage.setItem(
          WELCOME_BANNER_SESSION_KEY,
          JSON.stringify({
            show: true,
            createdAt: Date.now(),
          }),
        );
      }
    } catch (err) {
      setShowWelcomeBanner(true);
      localStorage.setItem(
        WELCOME_BANNER_SESSION_KEY,
        JSON.stringify({
          show: true,
          createdAt: Date.now(),
        }),
      );
    }
  }, []);

  return showWelcomeBanner ? (
    <WelcomeWrapper>
      <WelcomeImage
        src={welcomeImage}
        alt="homepage-welcome"
        imageClassName={styles.welcomeImage}
      />
      <IconWrapper
        onClick={() => {
          setShowWelcomeBanner(false);
          localStorage.setItem(
            WELCOME_BANNER_SESSION_KEY,
            JSON.stringify({
              show: false,
              createdAt: Date.now(),
            }),
          );
        }}
      >
        <IconClose />
      </IconWrapper>
      <WelcomeInfo>
        <WelcomeTitle>Đăng ký tham gia Free Contest thôi!</WelcomeTitle>
        <WelcomeText>
          Đăng ký ngay để được tham gia các kỳ thi hấp dẫn của Free Contest. Nâng cao kỹ năng lập
          trình thi đấu.
        </WelcomeText>
        <WelcomeText>
          Chuẩn bị cho các kỳ thi quan trọng như kỳ thi HSG QG môn Tin học, APIO, IOI, ACM-ICPC.
        </WelcomeText>
        <Button onClick={() => history.push(ROUTE_SIGNUP)}>Tạo tài khoản</Button>
      </WelcomeInfo>
    </WelcomeWrapper>
  ) : null;
}

export default WelcomeBanner;
