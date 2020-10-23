import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from 'src/assets/images/close-button.png';

import cx from 'classnames';

function Popup(props) {
  const { show, title, content, buttonText, variant, onButtonClick } = props;
  const { isClose, isOpen } = show.status;
  const handleClosePopup = React.useCallback(() => {
    const { setStatus } = show;
    setStatus({ isOpen: false, isClose: true });
  }, []);

  if (!isClose && !isOpen) return null;
  return ReactDOM.createPortal(
    <div className={!isClose ? styles.overlay : null}>
      <div className={cx(styles.container, isClose ? styles.close : styles.notClose)}>
        <div className={styles.titleBar}>
          <div
            className={cx(
              styles.title,
              variant === 'success' ? styles.titleColorSuccess : styles.titleColorFailed,
            )}
          >
            {!isClose && title}
          </div>
          <div className={styles.closeImg} onClick={handleClosePopup}>
            <img src={CloseButton} alt="close" />
          </div>
        </div>
        <div className={styles.content}>
          <div>{!isClose && content}</div>
        </div>
        <button
          className={styles.closeBtn}
          type="submit"
          onClick={onButtonClick === null ? handleClosePopup : onButtonClick}
        >
          {!isClose && buttonText}
        </button>
      </div>
    </div>,
    document.querySelector('body'),
  );
}

Popup.propTypes = {
  show: PropTypes.any,
  isClose: PropTypes.bool,
  content: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.string,
  OnButtonClick: PropTypes.func,
};

Popup.defaultProps = {
  show: null,
  isClose: false,
  content: '',
  title: '',
  buttonText: '',
  OnButtonClick: null,
  variant: '',
};

export default Popup;
