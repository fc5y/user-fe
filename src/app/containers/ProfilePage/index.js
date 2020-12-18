import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './style.scss';

// Images
import img from 'assets/images/avatar.png';

// Components
import ParticipatedContests from 'src/app/components/ParticipatedContests';
import Loading from 'src/app/common-ui/Loading';
import ErrorContent from 'src/app/common-ui/ErrorContent';
import { WarningPopup } from 'src/app/common-ui/Popup';

// import ErrorContent from '';

// Constants
import { API_PROGRESS } from 'src/shared/constants';

// Utils
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { getErrorMessage } from 'src/utils/getErrorMessage';

// Apis
import { apiGetMyUserInfo, apiGetUserInfo } from 'src/api/index';

function ProfilePage({ match }) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [apiState, setApiState] = useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });
  const [handlingUserInfo, setHandlingUserInfo] = useState({
    username: '',
    fullName: '',
    dateOfBirth: '',
    schoolName: '',
    email: '',
    bio: '',
    ranking: '',
    rating: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { code, msg, data } = await apiGetUserInfo({
        token: userInfo.token,
      });
      if (code) {
        setApiState({ progress: API_PROGRESS.FAILED, code, msg });
      } else {
        setHandlingUserInfo({
          username: data.user.username || '',
          fullName: data.user.full_name || '',
          dateOfBirth: '',
          schoolName: data.user.school_name || '',
          email: data.user.email || '',
          bio: '',
          ranking: 'NONE',
          rating: 'NONE',
        });
        setApiState({ progress: API_PROGRESS.SUCCESS, code, msg });
      }
    };
    fetchUserInfo();
  }, []);

  return apiState.progress === API_PROGRESS.SUCCESS ? (
    <div className={styles.container}>
      <Helmet>
        <title>Trang cá nhân</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.personalInfo}>
            <div className={styles.avatar}>
              <div className={styles.ava}>
                <img src={img} alt="avatar" />
              </div>
              <div className={styles.changeAvatar}>
                {userInfo.username === match.params.username && (
                  <Link to="/settings">Thay đổi ảnh cá nhân</Link>
                )}
              </div>
            </div>
            <div className={styles.infoContent}>
              <div>
                <h3>{handlingUserInfo.username}</h3>
              </div>
              <div>
                <span>Họ và tên:</span> {handlingUserInfo.fullName}
              </div>
              <div>
                <span>Ngày sinh:</span> {handlingUserInfo.dateOfBirth}
              </div>
              <div>
                <span>Trường học:</span> {handlingUserInfo.schoolName}
              </div>
              <div>
                <span>Email liên lạc:</span> {handlingUserInfo.email}
              </div>
              <div>
                <span>Bio:</span> {handlingUserInfo.bio}
              </div>
            </div>
          </div>
          <div className={styles.point}>
            <div className={styles.rankingAndRating}>
              <div className={styles.pointTitle}>RANK</div>
              <div className={styles.rankingScore}>{handlingUserInfo.ranking}</div>
            </div>
            <div className={styles.rankingAndRating}>
              <div className={styles.pointTitle}>RATING</div>
              <div className={styles.ratingScore}>{handlingUserInfo.rating}</div>
            </div>
          </div>
        </div>
        <ParticipatedContests username={match.params.username} />
      </div>
    </div>
  ) : apiState.progress === API_PROGRESS.FAILED && apiState.code === 2001 ? (
    <ErrorContent content="User not found!" />
  ) : apiState.progress === API_PROGRESS.FAILED ? (
    <ErrorContent content={getErrorMessage(apiState)} />
  ) : (
    <Loading />
  );
}

ProfilePage.propTypes = {
  match: PropTypes.any,
};

export default ProfilePage;
