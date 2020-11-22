import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './style.scss';

function InfoPage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.title}>Hướng dẫn</div>
        <Link to="/help/join">
          <div className={styles.item}>
            <div className={styles.img}>
              <img src="/src/assets/images/item.png" alt="Item" />
            </div>
            <div className={styles.itemcontent}>
              <div className={styles.itemtitle}>
                <h2>Hướng dẫn tham gia Free Contest</h2>
              </div>
              <div className={styles.description}> Hướng dẫn tham gia Free Contest</div>
            </div>
          </div>
        </Link>
        <Link to="/help/cms">
          <div className={styles.item}>
            <div className={styles.img}>
              <img src="/src/assets/images/item.png" alt="Item" />
            </div>
            <div className={styles.itemcontent}>
              <div className={styles.itemtitle}>
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
