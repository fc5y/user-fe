import React from 'react';

// Utils and constants
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ROUTE_HELP_JOIN, ROUTE_HELP_CMS } from 'src/app/routes/constants';

// Assets
import itemImage from 'assets/images/item.png';

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
            <div className={styles.img}>
              <img src={itemImage} alt="Item" />
            </div>
            <div className={styles.itemContent}>
              <div className={styles.itemTitle}>
                <h2>Hướng dẫn tham gia Free Contest</h2>
              </div>
              <div className={styles.description}> Hướng dẫn tham gia Free Contest</div>
            </div>
          </div>
        </Link>
        <Link to={ROUTE_HELP_CMS}>
          <div className={styles.item}>
            <div className={styles.img}>
              <img src={itemImage} alt="Item" />
            </div>
            <div className={styles.itemContent}>
              <div className={styles.itemTitle}>
                <h2>Hướng dẫn đăng ký thi trên hệ thống CMS</h2>
              </div>
              <div className={styles.description}> Hướng dẫn đăng ký thi trên hệ thống CMS </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default InfoPage;
