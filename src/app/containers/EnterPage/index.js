import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

// Contexts
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// APIs
import { apiGetContestCredential, apiGetContestCredentialV2 } from 'src/api';

import styles from './enter.scss';

const DO_NOTHING = () => {};

function EnterPage({ history }) {
  const { contestInfo } = React.useContext(ContestInfoContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const [contestCredential, setContestCredential] = React.useState({
    username: '',
    password: '',
  });

  React.useEffect(() => {
    const getCredential = async (token) => {
      try {
        const { data } = await apiGetContestCredential(token);
        if (!!data && !!data.username && !!data.password) {
          setContestCredential({
            username: data.username,
            password: data.password,
          });
          return;
        }
      } catch {
        DO_NOTHING();
      }

      try {
        const { data } = await apiGetContestCredentialV2(userInfo.username);
        if (!!data && !!data.data && !!data.data.contestUsername && !!data.data.contestPassword) {
          setContestCredential({
            username: data.data.contestUsername,
            password: data.data.contestPassword,
          });
          return;
        }
      } catch {
        DO_NOTHING();
      }

      // eslint-disable-next-line no-alert
      alert('You are not allowed to enter contest');
      history.push('/');
    };

    !!contestInfo.isContestReady &&
      !!userInfo.token &&
      !!userInfo.username &&
      getCredential(userInfo.token);
  }, [userInfo, contestInfo.isContestReady]);

  if (!userInfo.isFetched || !contestInfo.isFetched) {
    // Loading/Fetching state
    return null;
  } else if (!userInfo.username || !contestInfo.isContestReady) {
    // Check if user has login or not. If not redirect back to homepage
    // Or the contest is not ready, we also need to redirect
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <h5 className={styles.titleContent}>Vào thi</h5>
      <div className={styles.enterContest}>
        <h6 className={styles.textDecoration}>
          1. Truy cập vào địa chỉ:&nbsp;
          <a
            className={styles.linkDecoration}
            href="https://code.fyt.freecontest.net"
            target="_blank"
            rel="noreferrer"
          >
            https://code.fyt.freecontest.net
          </a>
        </h6>
      </div>

      <div className={styles.userInfo}>
        <h6 className={styles.textDecoration}>2. Đăng nhập với thông tin đăng nhập như sau:</h6>
        <ul className={styles.info}>
          <li className={styles.lstInfo}>Username: {contestCredential.username}</li>
          <li className={styles.lstInfo}>Password: {contestCredential.password}</li>
        </ul>
      </div>
    </div>
  );
}

EnterPage.propTypes = {
  history: PropTypes.any,
};

export default withRouter(EnterPage);
