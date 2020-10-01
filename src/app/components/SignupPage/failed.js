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
            <h5>Đăng ký thất bại</h5>
            <Link to="/signup">
              <img src={CloseButton} alt="close" />
            </Link>
          </div>
          <div className={styles.content}>
            <p>Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng kiểm tra lại.</p>
          </div>
          <Link to="/signup">
            <button type="submit">OK</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Failed;
