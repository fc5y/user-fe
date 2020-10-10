/* eslint-disable react/prop-types */
import React from 'react';

import { Redirect, withRouter } from 'react-router-dom';

import { UserInfoContext } from '../../../shared/context/UserInfo';
import { ContestInfoContext } from '../../../shared/context/ContestInfo';

import { apiGetContestCredential, apiGetContestCredentialV2 } from '../../../api/contest';

import styles from './enter.scss';

function EnterPage({ history }) {
  const { contestInfo } = React.useContext(ContestInfoContext);
  const { userInfo, isFetched: isUserInfoFetched } = React.useContext(UserInfoContext);
  const [contestCredential, setContestCredential] = React.useState({
    username: '',
    password: '',
  });

  React.useEffect(() => {
    const getCredential = async (token) => {
      let data = null;
      let error = null;

      try {
        const { data: v1data, error: v1error } = await apiGetContestCredential(token);
        data = v1data;
        error = v1error;
        // eslint-disable-next-line no-empty
      } catch (err) {}

      if (!!data && !!data.username && !!data.password) {
        setContestCredential({
          username: data.username,
          password: data.password,
        });
        return;
      }

      try {
        const { data: v2data, error: v2error } = await apiGetContestCredentialV2(userInfo.username);
        data = v2data;
        error = v2error;
        // eslint-disable-next-line no-empty
      } catch (err) {}

      if (!!data && !!data.data && !!data.data.contestUsername && !!data.data.contestPassword) {
        setContestCredential({
          username: data.data.contestUsername,
          password: data.data.contestPassword,
        });
        return;
      }

      alert('You are not allowed to enter contest');
      history.push('/');
    };

    !!contestInfo.isContestReady &&
      !!userInfo.token &&
      !!userInfo.username &&
      getCredential(userInfo.token);
  }, [userInfo, contestInfo.isContestReady]);

  if (!isUserInfoFetched || !contestInfo.isFetched) {
    // Loading/Fetching state
    return null;
  } else if ((!!userInfo && userInfo.username === null) || !contestInfo.isContestReady) {
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

export default withRouter(EnterPage);
