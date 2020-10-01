import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './success.scss';

import CloseButton from '../../../assets/images/XMLID 1429.png';

class Success extends Component {
  constructor() {
    super();
    this.generatePassword = this.generatePassword.bind(this);
  }

  generatePassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let newPassword = '';
    for (let i = 0; i < characters.length; i += 1)
      newPassword += characters[Math.floor(Math.random() * characters.length)];

    const userInfo = { ...this.props, ...{ contestPassword: newPassword } };
    localStorage.setItem('users', JSON.stringify(userInfo));
  }

  render() {
    return (
      <div className={styles.popupBackground}>
        <div className={styles.successPopup}>
          <div className={styles.titleBar}>
            <h5>Đăng ký thành công</h5>
            <Link to="/login" onClick={this.generatePassword}>
              <img src={CloseButton} alt="close" />
            </Link>
          </div>
          <div className={styles.content}>
            <p>Cảm ơn bạn đã đăng ký tham gia FYT Code Cup! Vui lòng đăng nhập để tiếp tục.</p>
          </div>
          <Link to="/login">
            <button type="submit" onClick={this.generatePassword}>
              Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Success;
