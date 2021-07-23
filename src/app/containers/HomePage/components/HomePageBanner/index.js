import * as React from 'react';
import cx from 'classnames';
import styles from './style.scss';

// Assets
import IconBanner from '../../../../../assets/images/bannerlogo.png';
import IconUsers from '../../../../../assets/images/icon-users.png';
import IconMedal from '../../../../../assets/images/icon-medal.png';
import IconFC5Y from '../../../../../assets/images/icon-fc.png';

export default function HomePageBanner() {
  React.useEffect(() => {
    console.log('test home page baner');
  }, []);

  return (
    <div>
      <div className={cx(styles.container)}>
        <img className={cx(styles.image)} src={IconBanner} alt="homepage-banner" />
        <div className={cx(styles.container_child)}>
          <div className={cx(styles.container_child_logo)}>
            <img src={IconFC5Y} alt="icon-logoFC5Y"></img>
            <div className={cx(styles.container_child_cnt)}>
              <p>
                <b>5 năm</b>
              </p>
              <p>Tổ chức các kỳ thi</p>
            </div>
          </div>
          <div className={cx(styles.container_child_users)}>
            <img src={IconUsers} alt="icon-users"></img>
            <div className={cx(styles.container_child_cnt)}>
              <p>
                <b>3800+</b>
              </p>
              <p>Thành viên</p>
            </div>
          </div>
          <div className={cx(styles.container_child_medal)}>
            <img src={IconMedal} alt="icon-medal"></img>
            <div className={cx(styles.container_child_cnt)}>
              <p>
                <b>Nền tảng lập trình thi đấu</b>
              </p>
              <p>hàng đầu Việt Nam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
