import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { ROUTE_HOMEPAGE } from '../../routes/constants';
import { PrimaryButton } from '../../common-ui/Button';
import styles from './style.scss';

function Page404() {
  const history = useHistory();

  return (
    <div className={styles.content}>
      <Helmet>
        <title>Không tìm thấy trang</title>
      </Helmet>
      <div className={styles.title}>404</div>
      <div className={styles.text}>Trang bạn yêu cầu hiện không thể tìm thấy</div>
      <PrimaryButton onClick={() => history.push(ROUTE_HOMEPAGE)}>Về trang chủ</PrimaryButton>
    </div>
  );
}

export default Page404;
