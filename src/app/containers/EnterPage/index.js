import React from 'react';

import { Redirect } from 'react-router-dom';

import { UserInfoContext } from '../../../shared/context/UserInfo';
import { ContestInfoContext } from '../../../shared/context/ContestInfo';

import styles from './enter.scss';

function EnterPage() {
  const { contestInfo } = React.useContext(ContestInfoContext);
  const { userInfo, isFetched: isUserInfoFetched } = React.useContext(UserInfoContext);

  if (!isUserInfoFetched || !contestInfo.isFetched) {
    // Loading/Fetching state
    return null;
  } else if ((!!userInfo && userInfo.username === null) || !contestInfo.isContestReady) {
    // Check if user has login or not. If not redirect back to homepage
    // Or the contest is not ready, we also need to redirect
    return <Redirect to="/" />;
  }

  const { username, contestPassword } = contestInfo;
  return (
    <div className={styles.container}>
      <h5 className={styles.titleContent}>Vào thi</h5>
      <div className={styles.enterContest}>
        <h6 className={styles.textDecoration}>
          1. Truy cập vào địa chỉ:&nbsp;
          <a className={styles.linkDecoration} href="contest.freecontest.net" target="_blank">
            contest.freecontest.net
          </a>
        </h6>
      </div>

      <div className={styles.userInfo}>
        <h6 className={styles.textDecoration}>2. Đăng nhập với thông tin đăng nhập như sau:</h6>
        <ul className={styles.info}>
          <li className={styles.lstInfo}>Username: {username}</li>
          <li className={styles.lstInfo}>Password: {contestPassword}</li>
        </ul>
      </div>
    </div>
  );
}

export default EnterPage;
