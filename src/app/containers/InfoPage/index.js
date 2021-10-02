import React from 'react';

// Utils and constants
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ROUTE_HELP_JOIN, ROUTE_HELP_CMS } from 'src/app/routes/constants';

import styles from './style.scss';

function InfoPage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.title}>Hướng dẫn</div>
        <Link to={ROUTE_HELP_JOIN}>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Hướng dẫn tham gia Free Contest</div>
            <div className={styles.description}>
              Hướng dẫn theo dõi lịch tổ chức, tạo tài khoản, đăng nhập, đăng ký kỳ thi, vào thi,
              xem bảng điểm, ...
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default InfoPage;
