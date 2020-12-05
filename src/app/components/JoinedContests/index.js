import React, { useState } from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';

import { get } from '../../../utils/fetchUtils';

const pastContestsPerPage = 2;

function getPastContestsOfPage(numberOfItems, itemsPerPage, currentPage) {
  if (currentPage <= 0 || currentPage > Math.ceil(numberOfItems / itemsPerPage)) return [0, 0];
  if (Math.floor(numberOfItems / itemsPerPage) >= currentPage) {
    return [itemsPerPage * (currentPage - 1) + 1, currentPage * itemsPerPage];
  } else {
    return [(Math.ceil(numberOfItems / itemsPerPage) - 1) * itemsPerPage + 1, numberOfItems];
  }
}

function JoinedContests({ token }) {
  const [pastContests, setPastContests] = useState([]);
  const [page, setPage] = useState(1);
  get(
    `https://test.api.freecontest.net/api/v1/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    true,
  ).then((res) => setPastContests(res.data));
  const [begin, end] = getPastContestsOfPage(pastContests.length, pastContestsPerPage, page);
  const trList = pastContests.map((contest, index) =>
    index >= begin - 1 && index <= end - 1 ? (
      <tr key={contest.id}>
        <th className={styles.tableNumber}>{contest.id}</th>
        <th className={styles.tableContest}>{contest.username}</th>
        <th className={styles.tableRanking}>{contest.full_name}</th>
        <th className={styles.tableRatingChange}>{contest.email}</th>
        <th className={styles.tableRating}>{contest.shool}</th>
      </tr>
    ) : (
      ''
    ),
  );
  return (
    <div className={styles.pastContest}>
      <div className={styles.pastContestTitle}>Các kỳ thi đã đăng ký</div>
      <div className={styles.pastContestContent}>
        <table>
          <tbody>
            <tr>
              <th className={styles.tableNumber}>#</th>
              <th className={styles.tableContest}>Kỳ thi</th>
              <th className={styles.tableRanking}>Thứ hạng</th>
              <th className={styles.tableRatingChange}>Thay đổi rating</th>
              <th className={styles.tableRating}>Rating</th>
            </tr>
            {trList}
          </tbody>
        </table>
      </div>
      <div className={styles.pastContestPage}>
        <span>
          Trang <span>1 2 3 4 5</span>
        </span>
      </div>
    </div>
  );
}
JoinedContests.propTypes = {
  token: PropTypes.any,
};

export default JoinedContests;
