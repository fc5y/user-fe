import React from 'react';

// Utils
import { UserInfoContext } from '../../../shared/context/UserInfo';

// Components
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import BtnLoginAndSignup from '../../components/Button/BtnLoginAndSignup';
import BtnJoin from '../../components/Button/BtnJoin';
import BtnDisabled from '../../components/Button/BtnDisabled';

// APIs
import { apiGetTime } from '../../../api/authentication';

// Data
import md from './Info.md';

import styles from './style.scss';

function HomePage() {
  const { userInfo } = React.useContext(UserInfoContext);
  const [isConstestStart, setIsContestStart] = React.useState(null);

  const getRegisterTime = async () => {
    const { data: response, error } = await apiGetTime();

    if (error || (!!response && response.countdownOpen > 0)) {
      setIsContestStart(false);
    } else {
      setIsContestStart(true);
    }
  };

  if (isConstestStart === null) {
    getRegisterTime();
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>FYT Code Cup</div>
      <div className={styles.info}>
        <Markdown source={md} />
        <Link to="/info">Quy chế của kỳ thi</Link>
      </div>
      {!userInfo || !userInfo.username ? (
        <>
          <div className={styles.alert}>Để tham gia thi, bạn cần tạo tài khoản</div>
          <BtnLoginAndSignup />
        </>
      ) : isConstestStart ? (
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
