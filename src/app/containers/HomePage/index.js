import React from 'react';

// Utils
import { get } from '../../../utils/fetchUtils';

// Context
import { UserInfoContext } from '../../../shared/context/UserInfo';

// Components
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import BtnLoginAndSignup from '../../components/Button/BtnLoginAndSignup';
import BtnJoin from '../../components/Button/BtnJoin';
import BtnDisabled from '../../components/Button/BtnDisabled';

// Data
import md from './Info.md';

import styles from './style.scss';

function HomePage() {
  const { userInfo } = React.useContext(UserInfoContext);

  React.useEffect(() => {
    get('/get-contest-name/get-contest-name').then(console.log);
  }, []);

  // TODO: Change later with API fetching
  const ableToEnterContest = false;

  return (
    <div className={styles.content}>
      <div className={styles.title}>FYT Code Cup</div>
      <div className={styles.info}>
        <Markdown source={md} />
        <Link to="/info">Thông tin kỳ thi</Link>
        <br />
        <Link to="/info/rules">Quy chế thi</Link>
      </div>
      {!userInfo || !userInfo.username ? (
        <>
          <div className={styles.alert}>Để tham gia thi, bạn cần tạo tài khoản</div>
          <BtnLoginAndSignup />
        </>
      ) : ableToEnterContest ? (
        <>
          <div className={styles.alert}>Để tham gia thi, bạn chỉ cần nhấn vào nút “Vào thi”</div>
          <BtnJoin />
        </>
      ) : (
        <>
          <div className={styles.alert}>
            Trang kỳ thi sẽ chỉ được bật một ít phút trước khi kỳ thi bắt đầu
          </div>
          <BtnDisabled />
        </>
      )}
    </div>
  );
}

export default HomePage;
