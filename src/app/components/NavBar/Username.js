import React from 'react';
import PropTypes from 'prop-types';

// Context
import { UserInfoContext } from '../../../shared/context/UserInfo';

// Components
import ClickWrapper from '../../common-ui/ClickWrapper';

// Assets
import vectorLogo from '../../../assets/images/vector.png';
import logoutLogo from '../../../assets/images/logout.png';

import styles from './username.scss';

function Username({ username }) {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const { clearUserInfo } = React.useContext(UserInfoContext);

  const onClickLogout = (event) => {
    // Prevent event propagation to out div
    event.stopPropagation();

    clearUserInfo();
  };

  return (
    <div className={styles.username}>
      <div>{username || ''}</div>
      <div
        ref={dropdownRef}
        className={styles.toggle}
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <img src={vectorLogo} alt="toggle" />
        {showDropDown && (
          <ClickWrapper
            onClickOutside={() => showDropDown && setShowDropDown(false)}
            exclude={[dropdownRef.current]}
          >
            <div className={styles.dropdownContainer} onClick={onClickLogout}>
              <div className={styles.dropdownLogout}>
                <img className={styles.dropdownLogoutImage} src={logoutLogo} alt="log-out" />
                <div className={styles.dropDownLogoutText}>Đăng Xuất</div>
              </div>
            </div>
          </ClickWrapper>
        )}
      </div>
    </div>
  );
}

Username.propTypes = {
  username: PropTypes.string,
};

export default Username;
