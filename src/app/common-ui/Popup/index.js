import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from 'assets/images/close-button.png';
import ErrorSign from 'assets/images/error.png';
import SucessSign from 'assets/images/success.png';
import WarningSign from 'assets/images/warning.png';
import cx from 'classnames';

const POPUP = {
  init: 0,
  error: 1,
  success: 2,
  warning: 3,
};

function Popup({ show, title, content, buttonText, variant, onButtonClick }) {
  // Pristine is the early state of Popup which is not being opened or closed yet
  const [isPristine, setIsPristine] = React.useState(true);

  React.useEffect(() => {
    if (isPristine && show !== POPUP.init) {
      setIsPristine(false);
    }
  }, [show]);

  const selectSign = (show) => {
    if (show === POPUP.error) return ErrorSign;
    if (show === POPUP.success) return SucessSign;
    if (show === POPUP.warning) return WarningSign;
    return null;
  };

  return !isPristine ? (
    ReactDOM.createPortal(
      <div className={cx(show !== POPUP.init && styles.overlay)}>
        <div className={cx(styles.container, show === POPUP.init ? styles.close : styles.open)}>
          <div className={styles.closeImg} onClick={onButtonClick}>
            <img src={CloseButton} alt="close" />
          </div>
          <div className={styles.signDiv}>
            <img className={styles.sign} src={selectSign(show)} alt="popupSign" />
          </div>
          <div className={styles.content}>
            <div>{content}</div>
          </div>
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
  content: PropTypes.any,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.string,
  onButtonClick: PropTypes.func,
};

Popup.defaultProps = {
  show: null,
  content: null,
  title: '',
  buttonText: '',
  variant: '',
  onButtonClick: () => {},
};

export default Popup;
