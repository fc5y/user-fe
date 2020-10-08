import React from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from '../../../assets/images/close-button.png';

function Popup(props) {
  const { onClose, title, content, buttonText, variant, onButtonClick } = props;
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.titleBar}>
          <div>
            <div
              className={`${styles.title} ${
                variant === 'success' ? styles.titleColorSuccess : styles.titleColorFailed
              }`}
            >
              {title}
            </div>
          </div>
          <div
            className={styles.closeImgDiv}
            onClick={variant === 'error' ? onClose : onButtonClick}
          >
            <img className={styles.closeImg} src={CloseButton} alt="close" />
          </div>
        </div>
        <div className={styles.content}>
          <div>{content}</div>
        </div>
        <button
          className={styles.closeBtn}
          type="submit"
          onClick={variant === 'error' ? onClose : onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func,
  content: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.string,
  onButtonClick: PropTypes.func,
};

Popup.defaultProps = {
  onClose: null,
  content: '',
  title: '',
  buttonText: '',
  onButtonClick: null,
  variant: '0',
};

export default Popup;
