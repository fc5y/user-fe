import React from 'react';

// Context
import { UserInfoContext } from '../../../shared/context/UserInfo';

// Components
import { Link } from 'react-router-dom';
import LoginAndSignup from './LoginAndSignup';
import Username from './Username';

// Data
import logoImage from '../../../assets/images/logo.png';

import styles from './style.scss';

function Header() {
  const { userInfo } = React.useContext(UserInfoContext);
  const { username = '' } = userInfo;
  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoImage} alt="logo" />
          </Link>
        </div>
        <div className={styles.menu}>
          <Link to="/info" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.5)' }}>
            Thông tin
          </Link>
        </div>
        {!username ? <LoginAndSignup /> : <Username username={username} />}
      </div>
    </div>
  );
}

export default Header;
