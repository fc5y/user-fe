import React from 'react';
import { Helmet } from 'react-helmet';

// Utils
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Components
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import BtnLoginAndSignup from '../../components/Button/BtnLoginAndSignup';
import BtnJoin from '../../components/Button/BtnJoin';
import BtnDisabled from '../../components/Button/BtnDisabled';
import Footer from 'src/app/components/Footer';

// Data
import md from './Info.md';

import styles from './style.scss';

function HomePage() {
  const { userInfo } = React.useContext(UserInfoContext);
  const { contestInfo } = React.useContext(ContestInfoContext);

  return (
    <div>
      <div className={styles.content}>
        <Helmet>
          <title>Cổng đăng ký FYT Code Cup</title>
        </Helmet>
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
        ) : contestInfo.isContestReady ? (
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
      <Footer />
    </div>
  );
}

export default HomePage;
