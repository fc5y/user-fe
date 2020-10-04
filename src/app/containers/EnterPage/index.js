import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { UserInfoContext } from '../../../shared/context/UserInfo';

import styles from './enter.scss';

class EnterPage extends Component {
  render() {
    if (!this.context || !this.context.isFetched) {
      // Loading/Fetching state
      return null;
    } else if (
      (!!this.context.userInfo && this.context.userInfo.username === null) ||
      !__IS_CONTEST_READY__
    ) {
      // Check if user has login or not. If not redirect back to homepage
      // Or the contest is not ready, we also need to redirect
      return <Redirect to="/" />;
    }

    const { username, contestPassword } = this.context.userInfo;
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
}

Component.contextType = UserInfoContext;

export default EnterPage;
