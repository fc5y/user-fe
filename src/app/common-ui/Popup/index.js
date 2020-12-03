import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from 'assets/images/close-button.png';
import iconError from 'assets/images/error.png';
import iconSuccess from 'assets/images/success.png';
import iconWarning from 'assets/images/warning.png';
import cx from 'classnames';

const POPUP_VARIANT = {
  DEFAULT: 0,
  ERROR: 1,
  SUCCESS: 2,
  WARNING: 3,
};

function Popup({ show, content, variant, onButtonClick }) {
  // Pristine is the early state of Popup which is not being opened or closed yet
  const [isPristine, setIsPristine] = React.useState(true);

  React.useEffect(() => {
    if (isPristine && show) {
      setIsPristine(false);
    }
  }, [show]);

  const selectSign = (variant) => {
    if (variant === POPUP_VARIANT.ERROR) return iconError;
    if (variant === POPUP_VARIANT.SUCESS) return iconSuccess;
    if (variant === POPUP_VARIANT.WARNING) return iconWarning;
    return '';
  };

  return !isPristine ? (
    ReactDOM.createPortal(
      <div className={cx(show && styles.overlay)}>
        <div className={cx(styles.container, !show ? styles.close : styles.open)}>
          <div className={styles.closeImg} onClick={onButtonClick}>
            <img src={CloseButton} alt="close" />
          </div>
          <div className={styles.iconContainer}>
            <img className={styles.sign} src={selectSign(variant)} alt="popupSign" />
          </div>
          <div className={styles.content}>{content}</div>
        </div>
      </div>,
      document.querySelector('body'),
    )
  ) : (
    <div />
  );
}

Popup.propTypes = {
  show: PropTypes.bool,
  content: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(POPUP_VARIANT)),
  onButtonClick: PropTypes.func,
};

Popup.defaultProps = {
  show: null,
  content: null,
  variant: POPUP_VARIANT.DEFAULT,
  onButtonClick: () => {},
};

export default Popup;
