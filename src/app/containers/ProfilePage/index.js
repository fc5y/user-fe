import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './style.scss';

import img from 'assets/images/avatar.png';
import JoinedContests from '../../components/JoinedContests';
import { get } from '../../../utils/fetchUtils';

function ProfilePage({ match }) {
  const currentUsername = 'hieu';
  // This temporary token is for testing purposes.
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2MDcwMTEzODh9.Udv-7lmkBxlTnlZtgKJhYrrREtzsAtNKqrl80FQqlS0';
  const [userInfo, setInfo] = useState({
    username: '',
    fullName: '',
    dateOfBirth: '',
    schoolName: '',
    email: '',
    bio: '',
    ranking: '',
    rating: '',
  });

  get(
    `https://test.api.freecontest.net/api/v1/users?username=${match.params.username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    true,
  ).then((res) =>
    setInfo({
      username: res.data[0].username || '',
      fullName: res.data[0].full_name || '',
      dateOfBirth: '',
      schoolName: res.data[0].school_namme || '',
      email: res.data[0].email || '',
      bio: '',
      ranking: '',
      rating: '',
    }),
  );

  return (
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
                {currentUsername === match.params.username ? (
                  <Link to="/settings">Thay đổi ảnh cá nhân</Link>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className={styles.infoContent}>
              <div>
                <h3>{userInfo.username}</h3>
              </div>
              <div>
                <span>Họ và tên:</span> {userInfo.fullName}
              </div>
              <div>
                <span>Ngày sinh:</span> {userInfo.dateOfBirth}
              </div>
              <div>
                <span>Trường học:</span> {userInfo.schoolName}
              </div>
              <div>
                <span>Email liên lạc:</span> {userInfo.email}
              </div>
              <div>
                <span>Bio:</span> {userInfo.bio}
              </div>
            </div>
          </div>
          <div className={styles.point}>
            <div className={styles.rankingAndRating}>
              <div className={styles.pointTitle}>RANK</div>
              <div className={styles.rankingScore}>{userInfo.ranking}</div>
            </div>
            <div className={styles.rankingAndRating}>
              <div className={styles.pointTitle}>RATING</div>
              <div className={styles.ratingScore}>{userInfo.rating}</div>
            </div>
          </div>
        </div>
        <JoinedContests token={token} />
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  match: PropTypes.any,
};

export default ProfilePage;
