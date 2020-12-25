import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './style.scss';

// Images
import img from 'assets/images/avatar.png';
import changeUsernameIcon from 'assets/images/changeUsernameIcon.png';

// Components
import ParticipatedContests from 'src/app/components/ParticipatedContests';
import Loading from 'src/app/common-ui/Loading';
import ErrorContent from 'src/app/common-ui/ErrorContent';

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
    schoolName: '',
    ranking: '',
    rating: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { code, msg, data } = await apiGetUserInfo({ username: match.params.username });
      if (code) {
        setApiState({ progress: API_PROGRESS.FAILED, code, msg });
      } else {
        setHandlingUserInfo({
          username: data.user.username || '',
          fullName: data.user.full_name || '',
          schoolName: data.user.school_name || '',
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
            </div>
            <div className={styles.infoContent}>
              <div>
                <h3>{handlingUserInfo.username} </h3>
                {userInfo.username === match.params.username && (
                  <Link to="/settings">
                    <img src={changeUsernameIcon} alt="Change username" />
                  </Link>
                )}
              </div>
              <div>
                <span>Họ và tên:</span> {handlingUserInfo.fullName}
              </div>
              <div>
                <span>Trường:</span> {handlingUserInfo.schoolName}
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
    <ErrorContent content="Thí sinh không tồn tại!" />
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
