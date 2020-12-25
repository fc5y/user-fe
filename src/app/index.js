import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Context
import { UserInfoProvider } from 'src/shared/context/UserInfo';
import { ContestInfoProvider } from 'src/shared/context/ContestInfo';

// Utils
import { renderRoute } from './routes';
import { get } from 'src/utils/fetchUtils';

// Components
import Header from './components/NavBar';
import Loading from './common-ui/Loading';

// TODO: Remove soon
import LandingPage from './LandingPage';

import 'normalize.css';
import './style.scss';

export default function App() {
  const [skipCountDown, setSkipCountDown] = React.useState(false);
  const [serverTime, setServerTime] = React.useState(null);

  React.useEffect(() => {
    const fetchTime = async () => {
      try {
        const { data } = await get(
          'https://test.api.freecontest.net/api/v1/contests?offset=0&limit=1',
        );

        if (data && data.server_time) {
          setServerTime(new Date(data.server_time * 1000));
        } else {
          setServerTime(new Date());
        }
      } catch (e) {
        setServerTime(new Date());
      }
    };

    // TODO: Remove soon, for prod and opening day used only
    __ENV__ === 'prod' && fetchTime();
  }, []);

  // TODO: Remove soon, for prod and opening day used only
  if (__ENV__ === 'prod' && !skipCountDown) {
    if (!serverTime) {
      return <Loading />;
    } else {
      const delta = new Date('2021-01-01T00:00:00.000+07:00') - serverTime;
      return delta > 0 ? (
        <LandingPage serverTime={serverTime} onClickSkip={() => setSkipCountDown(true)} />
      ) : (
        <BrowserRouter>
          <UserInfoProvider>
            <ContestInfoProvider>
              <Header />
              {renderRoute()}
            </ContestInfoProvider>
          </UserInfoProvider>
        </BrowserRouter>
      );
    }
  }

  return (
    <BrowserRouter>
      <UserInfoProvider>
        <ContestInfoProvider>
          <Header />
          {renderRoute()}
        </ContestInfoProvider>
      </UserInfoProvider>
    </BrowserRouter>
  );
}
