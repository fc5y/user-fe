import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from 'src/assets/images/close-button.png';

import cx from 'classnames';

function Popup({ show, title, content, buttonText, variant, onButtonClick }) {
  // Pristine is the early state of Popup which is not being opened or closed yet
  const [isPristine, setIsPristine] = React.useState(true);

  React.useEffect(() => {
    if (isPristine && show) {
      setIsPristine(false);
    }
  }, [show]);

  return !isPristine ? (
    ReactDOM.createPortal(
      <div className={cx(show && styles.overlay)}>
        <div className={cx(styles.container, !show ? styles.close : styles.open)}>
          <div className={styles.titleBar}>
            <div
              className={cx(
                styles.title,
                variant === 'success' ? styles.titleColorSuccess : styles.titleColorFailed,
              )}
            >
              {title}
            </div>
            <div className={styles.closeImg} onClick={onButtonClick}>
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
      </div>,
      document.querySelector('body'),
    )
  ) : (
    <div />
  );
}

Popup.propTypes = {
  show: PropTypes.any,
  content: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.string,
  onButtonClick: PropTypes.func,
};

Popup.defaultProps = {
  show: null,
  content: '',
  title: '',
  buttonText: '',
  variant: '',
  onButtonClick: () => {},
};

export default Popup;
