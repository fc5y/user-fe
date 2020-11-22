import React from 'react';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Components
import { Link } from 'react-router-dom';
import LoginAndSignup from './LoginAndSignup';
import Username from './Username';

// Data
import logoImage from 'src/assets/images/logo.png';

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
          <Link to="/contest">Các kỳ thi</Link>
          <Link to="/ranking">Bảng xếp hạng</Link>
          <Link to="/help">Thông tin</Link>
        </div>
        {!username ? <LoginAndSignup /> : <Username username={username} />}
      </div>
    </div>
  );
}

export default Header;
