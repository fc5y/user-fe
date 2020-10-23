import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from '../../../assets/images/close-button.png';

import cx from 'classnames';

function Popup(props) {
  const { onClose, title, content, buttonText, variant, onButtonClick } = props;
  const isClosed = onClose.status.isClose;

  return ReactDOM.createPortal(
    <div>
      <div className={!isClosed ? styles.overlay : null}>
        <div className={cx(styles.container, isClosed ? styles.close : styles.notClose)}>
          <div className={styles.titleBar}>
            <div
              className={cx(
                styles.title,
                variant === 'success' ? styles.titleColorSuccess : styles.titleColorFailed,
              )}
            >
              {!isClosed && title}
            </div>
            <div className={styles.closeImg} onClick={onClose.closePopup}>
              <img src={CloseButton} alt="close" />
            </div>
          </div>
          <div className={styles.content}>
            <div>{!isClosed && content}</div>
          </div>
          <button className={styles.closeBtn} type="submit" onClick={onButtonClick}>
            {!isClosed && buttonText}
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('body'),
  );
}

Popup.propTypes = {
  onClose: PropTypes.any,
  isClosed: PropTypes.bool,
  content: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.string,
  OnButtonClick: PropTypes.func,
};

Popup.defaultProps = {
  onClose: null,
  isClosed: false,
  content: '',
  title: '',
  buttonText: '',
  OnButtonClick: null,
  variant: '',
};

export default Popup;
