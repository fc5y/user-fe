import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './style.scss';

// Images
import img from 'assets/images/avatar.png';
import IconEdit from 'src/app/common-ui/Icons/IconEdit';

// Components
import ParticipatedContests from 'src/app/components/ParticipatedContests';
import Loading from 'src/app/common-ui/Loading';
import ErrorContent from 'src/app/components/ErrorContent';

// Constants
import { API_PROGRESS } from 'src/shared/constants';
import { ROUTE_SETTINGS } from 'src/app/routes/constants';

// Utils
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { getErrorMessage } from 'src/utils/getErrorMessage';

// Apis
import { apiGetUserInfo } from 'src/api/index';

function ProfilePage({ match }) {
  const { userInfo } = useContext(UserInfoContext);
  const [apiState, setApiState] = useState({
    progress: API_PROGRESS.INIT,
    error: null,
    msg: null,
  });
  const [handlingUserInfo, setHandlingUserInfo] = useState({
    username: '',
    fullName: '',
    schoolName: '',
    ranking: '—',
    rating: '—',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { error, error_msg: msg, data } = await apiGetUserInfo({
        username: match.params.username,
      });
      if (error) {
        setApiState({ progress: API_PROGRESS.FAILED, error, msg });
      } else {
        setHandlingUserInfo({
          username: data.user.username || '',
          fullName: data.user.full_name || '',
          schoolName: data.user.school_name || '',
          ranking: '—',
          rating: '—',
        });
        setApiState({ progress: API_PROGRESS.SUCCESS, error, msg });
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
              <div className={styles.insideInfoContentDiv}>
                <h3 className={styles.infoContentHeading}>{handlingUserInfo.username} </h3>
                {userInfo.username === match.params.username && (
                  <Link to={ROUTE_SETTINGS}>
                    <IconEdit />
                  </Link>
                )}
              </div>
              <div className={styles.insideInfoContentDiv}>
                <span className={styles.infoContentSpan}>Họ và tên:</span>{' '}
                {handlingUserInfo.fullName}
              </div>
              <div className={styles.insideInfoContentDiv}>
                <span className={styles.infoContentSpan}>Trường:</span>{' '}
                {handlingUserInfo.schoolName}
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
        <ParticipatedContests username={match.params.username} rating={userInfo.rating} />
      </div>
    </div>
  ) : apiState.progress === API_PROGRESS.FAILED && apiState.error === 2001 ? (
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
