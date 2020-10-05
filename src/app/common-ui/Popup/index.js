import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from '../../../assets/images/close-button.png';

class Popup extends Component {
  render() {
    const { closePopup, titleContent, mainContent, contentBtn, linkTo, isSuccess } = this.props;
    return (
      <div className={styles.overlay}>
        <div className={styles.popupBackground}>
          <div className={styles.container}>
            <div className={styles.titleBar}>
              <h5
                className={`${styles.titleContent} ${
                  isSuccess === '1' ? styles.titleColorSuccess : styles.titleColorFailed
                }`}
              >
                {titleContent}
              </h5>
              <Link to={linkTo} onClick={closePopup}>
                <img className={styles.closeImg} src={CloseButton} alt="close" />
              </Link>
            </div>
            <div className={styles.content}>
              <p>{mainContent}</p>
            </div>
            <Link className={styles.linkDecoration} to={linkTo} onClick={closePopup}>
              <button className={styles.closeBtn} type="submit">
                {contentBtn}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  closePopup: PropTypes.func,
  mainContent: PropTypes.string,
  titleContent: PropTypes.string,
  contentBtn: PropTypes.string,
  linkTo: PropTypes.string,
  isSuccess: PropTypes.string,
};

Popup.defaultProps = {
  closePopup: null,
  mainContent: '',
  titleContent: '',
  contentBtn: '',
  linkTo: '',
  isSuccess: '0',
};

export default Popup;
