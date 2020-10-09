import React from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from '../../../assets/images/close-button.png';

import cx from 'classnames';

function Popup(props) {
  const { onClose, title, content, buttonText, variant, onButtonClick } = props;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.titleBar}>
          <div
            className={cx(
              styles.title,
              variant === 'success' ? styles.titleColorSuccess : styles.titleColorFailed,
            )}
          >
            {title}
          </div>
          <div className={styles.closeImg} onClick={onClose}>
            <img src={CloseButton} alt="close" />
          </div>
        </div>
        <div className={styles.content}>
          <div>{content}</div>
        </div>
        <button className={styles.closeBtn} type="submit" onClick={onButtonClick}>
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
  variant: '',
};

export default Popup;
