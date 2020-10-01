import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './failed.scss';

import CloseButton from '../../../assets/images/XMLID 1429.png';

class Failed extends Component {
  render() {
    return (
      <div className={styles.popupBackground}>
        <div className={styles.failedPopup}>
          <div className={styles.titleBar}>
            <h5>Đăng nhập không thành công</h5>
            <Link to="/login">
              <img src={CloseButton} alt="close" />
            </Link>
          </div>
          <div className={styles.content}>
            <p>Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.</p>
          </div>
          <Link to="/login">
            <button type="submit">OK</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Failed;
