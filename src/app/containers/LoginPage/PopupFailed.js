import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './failed.scss';
import PropTypes from 'prop-types';

import CloseButton from '../../../assets/images/close-button.png';

class PopupFailed extends Component {
  render() {
    const { closePopup } = this.props;
    return (
      <div className={styles.popupBackground}>
        <div className={styles.failedPopup}>
          <div className={styles.titleBar}>
            <h5 className={styles.titleContent}>Đăng nhập không thành công</h5>
            <Link to="/login" onClick={closePopup}>
              <img className={styles.closeImg} src={CloseButton} alt="close" />
            </Link>
          </div>
          <div className={styles.content}>
            <p>Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.</p>
          </div>
          <Link className={styles.linkDecoration} to="/login" onClick={closePopup}>
            <button className={styles.closeBtn} type="submit">
              OK
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

PopupFailed.propTypes = {
  closePopup: PropTypes.func,
};

PopupFailed.defaultProps = {
  closePopup: '',
};

export default PopupFailed;
