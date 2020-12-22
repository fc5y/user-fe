import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';
import PropTypes from 'prop-types';

import CloseButton from 'assets/images/close-button.png';
import cx from 'classnames';

// common-ui
import IconError from 'src/app/common-ui/Icons/IconError';
import IconWarning from 'src/app/common-ui/Icons/IconWarning';
import IconSuccess from 'src/app/common-ui/Icons/IconSuccess';

export const POPUP_VARIANT = {
  DEFAULT: 0,
  ERROR: 1,
  SUCCESS: 2,
  WARNING: 3,
};

export default function Popup({ show, content, variant, onClose }) {
  // Pristine is the early state of Popup which is not being opened or closed yet
  const [isPristine, setIsPristine] = React.useState(true);

  React.useEffect(() => {
    if (isPristine && show) {
      setIsPristine(false);
    }
  }, [show]);

  const selectSign = (variantToIconUrl, className) => {
    if (variantToIconUrl === POPUP_VARIANT.ERROR) return <IconError className={className} />;
    if (variantToIconUrl === POPUP_VARIANT.SUCCESS) return <IconSuccess className={className} />;
    if (variantToIconUrl === POPUP_VARIANT.WARNING) return <IconWarning className={className} />;
    return '';
  };

  return !isPristine ? (
    ReactDOM.createPortal(
      <div className={cx(show && styles.overlay)}>
        <div className={cx(styles.container, !show ? styles.close : styles.open)}>
          <div className={styles.closeImg} onClick={onClose}>
            <img src={CloseButton} alt="close" />
          </div>
          <div className={styles.iconContainer}>{selectSign(variant, styles.icon)}</div>
          <div className={styles.content}>{content}</div>
        </div>
      </div>,
      document.querySelector('body'),
    )
  ) : (
    <div />
  );
}

export function ErrorPopup(props) {
  return <Popup {...props} variant={POPUP_VARIANT.ERROR} />;
}

export function WarningPopup(props) {
  return <Popup {...props} variant={POPUP_VARIANT.WARNING} />;
}

export function SuccessPopup(props) {
  return <Popup {...props} variant={POPUP_VARIANT.SUCCESS} />;
}

Popup.propTypes = {
  show: PropTypes.bool,
  content: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(POPUP_VARIANT)),
  onClose: PropTypes.func,
};

Popup.defaultProps = {
  show: false,
  content: null,
  variant: POPUP_VARIANT.DEFAULT,
  onClose: () => {},
};
