import * as React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// Components
import IconDropDown from 'src/app/common-ui/Icons/IconDropDown';
import ClickWrapper from 'src/app/components/ClickWrapper';

import styles from './style.scss';

export function DropDownButton({ className, children, dropList = [], type, ...otherProps }) {
  const [showList, setShowList] = React.useState(false);
  const isPrimary = type === 'primary';

  return (
    <div className={cx(styles.dropdownContainer, className)}>
      <button
        className={cx(styles.dropdownButton, isPrimary && styles.primaryDropdownButton)}
        type="button"
        {...otherProps}
        onClick={() => setShowList((showList) => !showList)}
      >
        {children}
      </button>
      <div className={styles.dropdownArrowContainer}>
        <button
          type="button"
          className={cx(styles.dropdownArrowButton, isPrimary && styles.primaryDropdownArrowButton)}
          onClick={() => setShowList((showList) => !showList)}
        >
          <IconDropDown />
        </button>
        {showList && (
          <ClickWrapper onClickOutside={() => setShowList(false)}>
            <div className={styles.dropdownList}>
              {dropList.length > 0 &&
                dropList.map((option, key) => {
                  return (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={key}
                      className={styles.dropdownItem}
                      onClick={() => {
                        option.onClick();
                        setShowList(false);
                      }}
                    >
                      {option.text}
                    </div>
                  );
                })}
            </div>
          </ClickWrapper>
        )}
      </div>
    </div>
  );
}

DropDownButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  dropList: PropTypes.any,
};

export function PrimaryDropDownButton(props) {
  return <DropDownButton {...props} type="primary" />;
}
