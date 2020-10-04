import React, { Component } from 'react';

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
            <div className={styles.closeLogo} onClick={closePopup}>
              <img className={styles.closeImg} src={CloseButton} alt="close" />
            </div>
          </div>
          <div className={styles.content}>
            <p>Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.</p>
          </div>
          <div className={styles.linkDecoration} onClick={closePopup}>
            <button className={styles.closeBtn} type="submit">
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

PopupFailed.propTypes = {
  closePopup: PropTypes.func,
};

PopupFailed.defaultProps = {
  closePopup: () => {},
};

export default PopupFailed;
