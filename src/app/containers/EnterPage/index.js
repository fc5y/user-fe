import React, { Component } from 'react';
import styles from './enter.scss';

let userInfo = [];

class EnterPage extends Component {
  render() {
    // get user's information
    const json = localStorage.getItem('users');
    if (json !== null) {
      let user;
      if (localStorage.users) {
        user = JSON.parse(json);
      }
      if (user) {
        userInfo = user;
      }
    }
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
            <li className={styles.lstInfo}>Username: {userInfo.username}</li>
            <li className={styles.lstInfo}>Password: {userInfo.contestPassword}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default EnterPage;
