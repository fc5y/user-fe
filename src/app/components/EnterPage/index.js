import React, { Component } from 'react';
import styles from './enter.scss';
import Header from '../NavBar/Header';

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
      <div>
        <Header username="" />
        <div className={styles.enter}>
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
            <h6 className={styles.textDecoration}>2. Đăng nhập với thông tin đăng nhập như sau:</h6>{' '}
            <br />
            <h6 className={styles.textDecoration}>
              - <span style={{ paddingLeft: '0.5em' }} />
              Username: {userInfo.username}
            </h6>
            <h6 className={styles.textDecoration}>
              - <span style={{ paddingLeft: '0.5em' }} />
              Password: {userInfo.contestPassword}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default EnterPage;
