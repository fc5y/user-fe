import React from 'react';
import { Helmet } from 'react-helmet';

// Utils
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Components
import { Link } from 'react-router-dom';

import styles from './style.scss';
import notiIcon from 'src/assets/images/noti_icon.png';
import banner1 from 'src/assets/images/banner1.png';
import banner2 from 'src/assets/images/banner2.png';
import unrated from 'src/assets/images/unrated.png';

function HomePage() {
  const { userInfo } = React.useContext(UserInfoContext);
  const { contestInfo } = React.useContext(ContestInfoContext);

  return (
    <div className={styles.content}>
      <Helmet>
        <title>Kc97ble - Free Contest</title>
      </Helmet>
      <div className={styles.notification}>
        <div className={styles.notiIcon}>
          <img src={notiIcon} alt="Notification icon" />
        </div>
        <div className={styles.notiContent}>
          <h3 className={styles.notiTitle}>Beginner Free Contest 20 đang diễn ra</h3>
          <p className={styles.notiDescription}>Vào làm bài thôi</p>
        </div>
        <div className={styles.notiEnter}>
          <Link to="/enter">
            <div className={styles.notiEnterBtn}>Vào thi</div>
          </Link>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.articles}>
          <div className={styles.article}>
            <div className={styles.banner}>
              <img src={banner1} alt="Banner" />
            </div>
            <div className={styles.articleDescription}>
              <div className={styles.articleContent}>
                <h3>Beginner Free Contest 20</h3>
                <h4>07/07/2020 19:30 - 22:30</h4>
                <p>Bạn đã đăng ký kỳ thi này</p>
              </div>
              <div className={styles.articleBtn}>
                <Link to="/join">
                  <div className={styles.joinNowBtn}>Vào thi ngay</div>
                </Link>
              </div>
            </div>
            <div className={styles.detail}>
              <strong>
                <Link to="/view">Xem chi tiết</Link>
              </strong>
            </div>
          </div>
          <div className={styles.article}>
            <div className={styles.banner}>
              <img src={banner2} alt="Banner" />
            </div>
            <div className={styles.articleDescription}>
              <div className={styles.articleContent}>
                <h3>Beginner Free Contest 20</h3>
                <h4>07/07/2020 19:30 - 22:30</h4>
                <p>Bạn đã đăng ký kỳ thi này</p>
              </div>
              <div className={styles.articleBtn}>
                <Link to="/view">
                  <div className={styles.viewResultBtn}>Xem kết quả</div>
                </Link>
              </div>
            </div>
            <div className={styles.detail}>
              <strong>
                <Link to="/a">Để bài</Link>
                <Link to="/a">Bộ test</Link>
                <Link to="/a">Bảng điểm</Link>
                <Link to="/a">Lời giải</Link>
                <Link to="/a">Bài giải</Link>
              </strong>
            </div>
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.information}>
            <div className={styles.infoContent}>
              <h3>Vị trí hiện tại</h3>
              <span>
                Chào <span>xuanquang1999</span>, bạn hiện đang có rating <strong>2446</strong>, cấp
                bậc <span>Grandmaster</span>, xếp thứ <strong>407</strong>
              </span>
            </div>
            <div className={styles.infoBtnWrapper}>
              <Link to="/users/testuser">
                <div className={styles.infoBtn}>Xem trang cá nhân</div>
              </Link>
            </div>
          </div>
          <div className={styles.topUsers}>
            <table>
              <tbody>
                <tr>
                  <th className={styles.topUsersNameTitle}>Top 10 thí sinh</th>
                  <th className={styles.topUsersRatingTitle}>Rating</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
                <tr>
                  <th className={styles.topUsersName}>
                    <Link to="/users/testuser">MiFaFaOvO</Link>
                  </th>
                  <th className={styles.topUsersRating}>1257</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.evaluation}>
            <h3>Đánh giá Free Contest 112</h3>
            <p>Bạn thấy kỳ thi vừa rồi như thế nào?</p>
            <div className={styles.rate}>
              <img src={unrated} alt="Rate icon" />
              <img src={unrated} alt="Rate icon" />
              <img src={unrated} alt="Rate icon" />
              <img src={unrated} alt="Rate icon" />
              <img src={unrated} alt="Rate icon" />
            </div>
            <p>Nhận xét</p>
            <input />
            <div onClick={() => alert('Sent!')} className={styles.evaluateBtn}>
              Gửi nhận xét
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
